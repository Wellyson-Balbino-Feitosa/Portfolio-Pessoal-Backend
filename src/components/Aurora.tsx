import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

// ─── Shaders ────────────────────────────────────────────────────────────────

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/**
 * Simplex noise + aurora height field renderizados via WebGL ES 3.0.
 * COLOR_RAMP interpola linearmente entre 3 color stops ao longo do eixo X.
 */
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3  uColorStops[3];
uniform vec2  uResolution;
uniform float uBlend;

out vec4 fragColor;

// ── Simplex noise 2D ────────────────────────────────────────────────────────
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,  0.366025403784439,
   -0.577350269189626,  0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy  -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );
  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x   + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// ── Gradiente linear entre 3 stops ─────────────────────────────────────────
struct ColorStop {
  vec3  color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor)          \
  {                                                     \
    int idx = 0;                                        \
    for (int i = 0; i < 2; i++) {                       \
      bool between = colors[i].position <= factor;      \
      idx = int(mix(float(idx), float(i), float(between))); \
    }                                                   \
    ColorStop cur  = colors[idx];                       \
    ColorStop nxt  = colors[idx + 1];                   \
    float range    = nxt.position - cur.position;       \
    float t        = (factor - cur.position) / range;   \
    finalColor     = mix(cur.color, nxt.color, t);      \
  }

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Monta array de color stops
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // Campo de altura da aurora baseado em simplex noise
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height    = exp(height);
  height    = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  // Limiar suavizado para alpha
  float midPoint   = 0.20;
  float auroraAlpha = smoothstep(
    midPoint - uBlend * 0.5,
    midPoint + uBlend * 0.5,
    intensity
  );

  vec3 auroraColor = intensity * rampColor;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface AuroraProps {
  /** Três hexadecimais que definem o gradiente horizontal da aurora. */
  colorStops?: [string, string, string];
  /** Amplitude das ondas (padrão: 1.0). */
  amplitude?: number;
  /** Suavidade da transição alpha (padrão: 0.5). */
  blend?: number;
  /** Velocidade da animação (padrão: 1.0). */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Componente ─────────────────────────────────────────────────────────────

export default function Aurora({
  colorStops = ['#38bdf8', '#0ea5e9', '#38bdf8'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  className = '',
  style,
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mantém as props atualizadas sem reinicializar o WebGL
  const propsRef = useRef({ colorStops, amplitude, blend, speed });
  propsRef.current = { colorStops, amplitude, blend, speed };

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    // Renderer com alpha habilitado para composição sobre outros layers
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program: Program;

    function resize() {
      if (!ctn) return;
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      if (program) program.uniforms.uResolution.value = [ctn.offsetWidth, ctn.offsetHeight];
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(ctn);

    // Sem atributo UV — o shader calcula via gl_FragCoord
    const geometry = new Triangle(gl);
    if ((geometry.attributes as Record<string, unknown>).uv) {
      delete (geometry.attributes as Record<string, unknown>).uv;
    }

    const toRgb = (hex: string): [number, number, number] => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    };

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime:       { value: 0 },
        uAmplitude:  { value: amplitude },
        uColorStops: { value: colorStops.map(toRgb) },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend:      { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animId = 0;

    const update = (t: number) => {
      animId = requestAnimationFrame(update);
      const p = propsRef.current;
      program.uniforms.uTime.value       = t * 0.001 * (p.speed ?? 1.0);
      program.uniforms.uAmplitude.value  = p.amplitude ?? 1.0;
      program.uniforms.uBlend.value      = p.blend ?? 0.5;
      program.uniforms.uColorStops.value = (p.colorStops ?? colorStops).map(toRgb);
      renderer.render({ scene: mesh });
    };

    animId = requestAnimationFrame(update);
    resize();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // Recria apenas se amplitude mudar (breaking change no shader)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={style}
    />
  );
}

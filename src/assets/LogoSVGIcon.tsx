import * as React from "react";

export const LogoSVGIcon = (props: React.SVGProps<SVGSVGElement> & {
    fill?: string
    fillA?: string
    fillZ?: string
    strokeColor?: string
    strokeWidth?: number
}) => {
    // Extrair props customizadas para evitar warnings e sanitizar dimensões
    const { fillA, fillZ, strokeColor, strokeWidth, style: userStyle, width, height, ...svgProps } = props
 
    const viewW = 110
    const viewH = 75.58667

    const sanitizedHeight = height === 'auto' ? undefined : height
    const sanitizedWidth = width

    const mergedStyle: React.CSSProperties = {
        ...(userStyle || {}),
        ...(height === 'auto' ? { height: 'auto' } : {}),
    }

    const fillGeneral = props.fill || "#231f20"
    const fillPath = {
        A: fillA || fillGeneral,
        Z: fillZ || fillGeneral,
    }
    const finalStrokeColor = strokeColor || "black"
    const finalStrokeWidth = strokeWidth || 0

    return (
        // TODO: Verificar se o SVG está correto e se está sendo renderizado corretamente
        <svg
            id="svg1"
            width={sanitizedWidth ?? viewW}
            height={sanitizedHeight ?? viewH}
            viewBox={`0 0 ${viewW} ${viewH}`}
            xmlns="http://www.w3.org/2000/svg"
            style={mergedStyle}
            {...svgProps}
        >
            <defs id="defs1" />
            {/* Fundo para visualização - pode ser removido depois */}
            <rect width={viewW} height={viewH} fill="transparent" stroke="transparent" strokeWidth="0" />
            <g id="g1">
                <g id="group-R5">
                    <path
                        id="path2"
                        d="M 313.262,493.02 42.1758,85.4219 H 121.582 L 308.855,367.996 307.195,85.4219 h 78.782 V 493.02 h -72.715"
                        style={{
                            fill: fillPath.A,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            strokeWidth: finalStrokeWidth,
                            stroke: finalStrokeColor,
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                    <path
                        id="path3"
                        d="M 727.656,493.02 H 410.02 V 420.867 H 597.449 L 403.262,85.4219 730.105,85.7344 v 72.1486 l -195.449,-0.305 193,335.442"
                        style={{
                            fill: fillPath.Z,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            strokeWidth: finalStrokeWidth,
                            stroke: finalStrokeColor,
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                
                </g>
            </g>
        </svg>
    )
}


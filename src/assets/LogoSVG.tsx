import * as React from "react";

export const LogoSVG = (props: React.SVGProps<SVGSVGElement> & {
    fill?: string
    fillA?: string
    fillZ?: string
    fillList?: string
}) => {
    // Extrair props customizadas para evitar warnings
    const { fillA, fillZ, fillList, style: userStyle, width, height, ...svgProps } = props

    // Sanitizar dimensões: height="auto" não é válido em atributo SVG
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
        List: fillList || fillGeneral,
    }
    const stroke = props.stroke || "none"

    return (
        // TODO: Verificar se o SVG está correto e se está sendo renderizado corretamente
        <svg
            id="svg1"
            width={sanitizedWidth}
            height={sanitizedHeight}
            viewBox="0 0 188.97333 75.58667"
            xmlns="http://www.w3.org/2000/svg"
            style={mergedStyle}
            {...svgProps}
        >
            <defs id="defs1" />
            <g id="g1">
                <g id="group-R5">
                    <path
                        id="path2"
                        d="M 313.262,493.02 42.1758,85.4219 H 121.582 L 308.855,367.996 307.195,85.4219 h 78.782 V 493.02 h -72.715"
                        style={{
                            fill: fillPath.A,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: stroke,
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
                            stroke: "none",
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                    <path
                        id="path4"
                        d="m 819.492,493.02 h 15.43 V 85.4219 h -15.43 V 493.02"
                        style={{
                            fill: fillPath.List,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                    <path
                        id="path5"
                        d="m 920.281,377.363 h 15.434 V 85.4219 h -15.434 z m 0,115.657 h 15.434 v -50.118 h -15.434 v 50.118"
                        style={{
                            fill: fillPath.List,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                    <path
                        id="path6"
                        d="m 1156.58,308.508 c 0,44.062 -30.28,62.246 -61.69,61.695 -39.11,0 -65.55,-26.441 -63.89,-61.148 1.65,-35.254 22.57,-48.481 63.89,-60.039 38.57,-10.469 82.07,-20.942 85.38,-83.164 2.76,-47.93 -35.25,-87.5903 -85.38,-87.5903 -48.47,0 -93.08,34.6993 -89.79,88.1253 h 15.43 c 0,-46.809 31.95,-73.8089 74.36,-73.8089 43.52,0 71.06,33.0469 69.96,71.0549 -1.1,40.207 -23.14,59.504 -70.5,69.953 -44.09,12.664 -77.13,25.34 -78.78,75.469 0,48.476 35.81,75.468 79.32,75.468 42.41,-0.558 77.12,-25.902 77.12,-76.015 h -15.43"
                        style={{
                            fill: fillPath.List,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                    <path
                        id="path7"
                        d="m 1281.58,363.035 h -64.44 v 14.328 h 64.44 V 493.02 h 15.44 V 377.363 h 74.9 v -14.328 h -74.9 V 85.4219 h -15.44 V 363.035"
                        style={{
                            fill: fillPath.List,
                            fillOpacity: 1,
                            fillRule: "nonzero",
                            stroke: "none",
                        }}
                        transform="matrix(0.13333333,0,0,-0.13333333,0,75.586667)"
                    />
                </g>
            </g>
        </svg>
    )
}


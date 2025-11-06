import { Text, TextProps } from "@chakra-ui/react"


interface TextHighlightHalfProps extends TextProps {
    children: React.ReactNode
    highlightColor?: string
    highlightHeight?: string
    highlightPosition?: 'top' | 'bottom' | 'center'
}

export const TextHighlightHalf = ({ 
    children, 
    highlightColor = "yellow.200",
    highlightHeight = "50%",
    highlightPosition = "bottom",
    ...props 
}: TextHighlightHalfProps) => {
    
    // Determinar posicionamento do highlight
    const getHighlightPosition = () => {
        switch (highlightPosition) {
            case 'top':
                return { top: 0 }
            case 'center':
                return { top: "50%", transform: "translateY(-50%)" }
            case 'bottom':
            default:
                return { bottom: 0 }
        }
    }

    return (
        <Text 
            position="relative" 
            display="inline-block"
            {...props}
        >
            {/* Highlight atrás do texto */}
            <Text
                as="span"
                position="absolute"
                left="0"
                right="0"
                height={highlightHeight}
                bg={highlightColor}
                zIndex="1"
                borderRadius="sm"
                {...getHighlightPosition()}
            />
            
            {/* Texto principal */}
            <Text as="span" position="relative" zIndex="1">
                {children}
            </Text>
        </Text>
    )
}



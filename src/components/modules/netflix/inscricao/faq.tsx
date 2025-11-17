/**
 * Dados das Perguntas Frequentes (FAQ)
 * 
 * Contém todas as perguntas e respostas relacionadas ao evento Netflix Feito Aqui
 */

import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface FAQItem {
    question: string | ReactNode
    answer: string | ReactNode
}

export const faqData: FAQItem[] = [
    {
        question: (
            <>
                O <Text as="span" fontStyle="italic">Feito Aqui</Text> é aberto ao público?
            </>
        ),
        answer: (
            <>
                Não. O <Text as="span" fontStyle="italic">Feito Aqui</Text> é um evento exclusivo para convidados da Netflix e parceiros do audiovisual brasileiro.
            </>
        )
    },
    {
        question: (
            <>
                O evento será presencial ou digital?
            </>
        ),
        answer: (
            <>
                O <Text as="span" fontStyle="italic">Feito Aqui</Text> é um evento <Text as="span" fontWeight="bold">presencial</Text>.
            </>
        )
    },
    {
        question: 'O evento é acessível?',
        answer: 'Sim. O local conta com acessibilidade para pessoas com deficiência e mobilidade reduzida.'
    },
    {
        question: 'Posso indicar outra pessoa para participar do evento?',
        answer: 'Não. O evento é restrito a convidados da Netflix.'
    },
    {
        question: (
            <>
                Haverá estacionamento no local?
            </>
        ),
        answer: (
            <>
                Sim. O Villaggio JK oferece serviço de <Text as="span" fontWeight="bold">valet</Text> no local.
            </>
        )
    },
    {
        question: 'Haverá chapelaria no local?',
        answer: 'Sim. Contaremos com o serviço de chapelaria.'
    }
]


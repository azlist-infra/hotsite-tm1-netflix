// Skeleton para tabelas durante loading

import { Box, Skeleton, Table } from '@chakra-ui/react'

interface SkeletonTableProps {
    rows?: number
    columns?: number
}

export function SkeletonTable({ rows = 5, columns = 4 }: SkeletonTableProps) {
    return (
        <Box bg="white" borderRadius="md" borderWidth={1} overflow="hidden" shadow="sm">
            <Table.Root size="lg" variant="line">
                <Table.Header bg="gray.50">
                    <Table.Row>
                        {Array.from({ length: columns }).map((_, i) => (
                            <Table.ColumnHeader key={i}>
                                <Skeleton height="20px" />
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <Table.Row key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <Table.Cell key={colIndex}>
                                    <Skeleton height="16px" />
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    )
}


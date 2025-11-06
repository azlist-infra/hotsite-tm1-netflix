#update typescript befor change tokens
npx @chakra-ui/cli typegen src/designsystem/theme/index.ts

para não dar erro no CLI trocar a const font para uma default que está comentada, rodar cli e depois voltar para a que possui o google fonts. Tirar tudo de google fonts temporariamente
src\designsystem\theme\fonts.ts


###Configurações de fonts e textos do sistema

1. Importar e configurar as Google Fonts
src\designsystem\theme\fonts.ts

2. Configurar as fonts family padrão (primária, secundária e custom, se houver)
// Configuração opcional pois os títulos e body já estão configurados com a font primária e custom com a secundária.
// Se não houver secundária, excluir a custom
src\designsystem\theme\tokens\fonts.ts
// Utilização com a prop fontFamily="<nome>" em qualquer elemento


#Configurações dos tokens (estilos) pré-definidos de texto
// Utilização com a prop fontStyle="<nome>" em qualquer elemento
// Adicionar os estilos default de textos

3. Configuração dos textos especiais (componentes pré-definidos)



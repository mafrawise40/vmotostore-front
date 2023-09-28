
export const GRID_PTBR_LOCALE_TEXT: any = {
    // Root
    noRowsLabel: 'Sem linhas',
    noResultsOverlayLabel: 'Nenhum resultado encontrado.',


    // Density selector toolbar button text
    toolbarDensity: 'Densidade',
    toolbarDensityLabel: 'Densidade',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Padrão',
    toolbarDensityComfortable: 'Confortável',

    // Columns selector toolbar button text
    toolbarColumns: 'Colunas',
    toolbarColumnsLabel: 'Selecionar colunas',

    // Filters toolbar button text
    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Mostrar filtros',
    toolbarFiltersTooltipHide: 'Esconder filtros',
    toolbarFiltersTooltipShow: 'Mostrar filtros',
    toolbarFiltersTooltipActive: (count: any) => count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Pesquisar...',
    toolbarQuickFilterLabel: 'Pesquisar',
    toolbarQuickFilterDeleteIconLabel: 'Limpar',

    // Export selector toolbar button text
    toolbarExport: 'Exportar',
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: 'Download como CSV',
    toolbarExportPrint: 'Imprimir',
    toolbarExportExcel: 'Download como Excel',

    // Columns panel text
    columnsPanelTextFieldLabel: 'Encontrar coluna',
    columnsPanelTextFieldPlaceholder: 'Título da coluna',
    columnsPanelDragIconLabel: 'Reordenar coluna',
    columnsPanelShowAllButton: 'Mostrar todas',
    columnsPanelHideAllButton: 'Ocultar todas',

    // Filter panel text
    filterPanelAddFilter: 'Adicionar filtro',
    filterPanelDeleteIconLabel: 'Excluir',
    //filterPanelLinkOperator: 'Operador lógico',
    //filterPanelOperators: 'Operador',
    filterPanelOperatorAnd: 'E',
    filterPanelOperatorOr: 'Ou',
    filterPanelColumns: 'Colunas',
    filterPanelInputLabel: 'Valor',
    filterPanelInputPlaceholder: 'Valor do filtro',

    // Filter operators text
    filterOperatorContains: 'contém',
    filterOperatorEquals: 'é igual a',
    filterOperatorStartsWith: 'começa com',
    filterOperatorEndsWith: 'termina com',
    filterOperatorIs: 'é',
    filterOperatorNot: 'não é',
    filterOperatorAfter: 'é posterior a',
    filterOperatorOnOrAfter: 'é em ou após',
    filterOperatorBefore: 'é anterior a',
    filterOperatorOnOrBefore: 'é em ou antes',
    filterOperatorIsEmpty: 'está vazio',
    filterOperatorIsNotEmpty: 'não está vazio',
    filterOperatorIsAnyOf: 'é qualquer um de',

    // Filter values text
    filterValueAny: 'qualquer',
    filterValueTrue: 'verdadeiro',
    filterValueFalse: 'falso',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Mostrar colunas',
    columnMenuFilter: 'Filtrar',
    columnMenuHideColumn: 'Ocultar',
    columnMenuUnsort: 'Desordenar',
    columnMenuSortAsc: 'Ordenar ASC',
    columnMenuSortDesc: 'Ordenar DESC',

    // Column header text
    columnHeaderFiltersTooltipActive: (count: any) => count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
    columnHeaderFiltersLabel: 'Mostrar filtros',
    columnHeaderSortIconLabel: 'Ordenar',

    // Rows selected footer text
    footerRowSelected: (count: any) => count !== 1
        ? `${count.toLocaleString()} linhas selecionadas`
        : `${count.toLocaleString()} linha selecionada`,

    // Total row amount footer text
    footerTotalRows: 'Total de linhas:',

    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount: any, totalCount: any) => `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Seleção de caixa de seleção',
    checkboxSelectionSelectAllRows: 'Selecionar todas as linhas',
    checkboxSelectionUnselectAllRows: 'Desselecionar todas as linhas',
    checkboxSelectionSelectRow: 'Selecionar linha',
    checkboxSelectionUnselectRow: 'Desselecionar linha',

    // Boolean cell text
    booleanCellTrueLabel: 'sim',
    booleanCellFalseLabel: 'não',

    // Actions cell more text
    actionsCellMore: 'mais',

    // Column pinning text
    pinToLeft: 'Fixar à esquerda',
    pinToRight: 'Fixar à direita',
    unpin: 'Desafixar',

    // Tree Data
    treeDataGroupingHeaderName: 'Grupo',
    treeDataExpand: 'ver filhos',
    treeDataCollapse: 'ocultar filhos',

    // Grouping columns
    groupingColumnHeaderName: 'Grupo',
    groupColumn: (name: any) => `Agrupar por ${name}`,
    unGroupColumn: (name: any) => `Parar de agrupar por ${name}`,

    // Master/detail
    detailPanelToggle: 'Alternar painel de detalhes',
    expandDetailPanel: 'Expandir',
    collapseDetailPanel: 'Recolher',



    // Row reordering text
    rowReorderingHeaderName: 'Reordenar linha',

    // Aggregation
    aggregationMenuItemHeader: 'Agregação',
    aggregationFunctionLabelSum: 'soma',
    aggregationFunctionLabelAvg: 'média',
    aggregationFunctionLabelMin: 'mínimo',
    aggregationFunctionLabelMax: 'máximo',
    aggregationFunctionLabelSize: 'tamanho',

    MuiTablePagination: {
        labelRowsPerPage: 'Linhas por página:',
       // labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count}`
    },

};
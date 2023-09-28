import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GRID_PTBR_LOCALE_TEXT } from '../../../../utils/DataTableUtils';
import { SvgIcon } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import FormatadorMonetario from '../../../../utils/MonetarioUtil';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const localizedTextsMap = GRID_PTBR_LOCALE_TEXT;




export default function ProdutoDataTable(props: any) {

    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', width: 300, valueGetter: (params: GridValueGetterParams) =>
                `${params.row._id || ''} ${params.row._id || ''}`
        },
        {
            field: 'nome', headerName: 'Descrição', width: 400,
        },
        { field: 'aplicacao', headerName: 'Aplicação', width: 300 },
        {
            field: 'precoVenda', headerName: 'Preço de Venda', width: 300, renderCell(params) {

                return (<span>
                    <SvgIcon sx={{ fontSize: 25 }}>
                        <PaidIcon color="success" ></PaidIcon>
                    </SvgIcon>
                    <span> {FormatadorMonetario.formatarValorMonetario(params.row.precoVenda, "")} </span>
                </span>)
            },
        },
        {
            field: 'precoCompra', headerName: 'Preço de Custo', width: 300, renderCell(params) {

                return (<span>
                    <SvgIcon sx={{ fontSize: 25 }}>
                        <PaidIcon color="error" ></PaidIcon>
                    </SvgIcon>
                    <span> {FormatadorMonetario.formatarValorMonetario(params.row.precoCompra, "")} </span>
                </span>)
            }
        },
        { field: 'quantidade', headerName: 'Quantidade em estoque', width: 200 },
        { field: 'quantidadeVenda', headerName: 'Vendido (x)', width: 100 },
        {
            field: '_action', headerName: 'Ações', width: 100, renderCell(params) {

                return (
                    <><span onClick={() => {
                        props.irPaginaEditarProduto(params.row._id);
                    }}>
                        <SvgIcon sx={{ fontSize: 25 }}>
                            <EditIcon color="info" ></EditIcon>
                        </SvgIcon>

                    </span>
                        <span onClick={() => {
                            props.deletarProduto(params.row._id);
                        }}>
                            <SvgIcon sx={{ fontSize: 25 }}>
                                <DeleteForeverIcon color="error" ></DeleteForeverIcon>
                            </SvgIcon>

                        </span></>)
            },
        },
    ];

    const rows = props.produtos;

    let generateRowId = (row: any) => `${row._id}`;

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={props.produtos}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 50 },

                    },
                }}
                pageSizeOptions={[10, 20, 30, 50, 100]}
                
                localeText={localizedTextsMap}
                pagination={true}
                getRowId={generateRowId}
            />
        </div>
    );
}
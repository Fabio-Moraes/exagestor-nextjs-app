import * as S from './styles';

const statusColors = {
  concluído: '#2ecc71',
  análise: '#f1c40f',
  ativo: '#3498db',
  pausado: '#e67e22',
  cancelado: '#e74c3c',
  agendado: '#95a5a6'
} as { [key: string]: string };

export function IndexColors() {
  return (
    <S.Table>
      <tbody>
        {Object.keys(statusColors).map((status) => (
          <S.TableRow key={status}>
            <S.TableCell>{status.charAt(0).toUpperCase() + status.slice(1)}</S.TableCell>
            <S.TableCell>
              <S.ColorBox color={statusColors[status]}></S.ColorBox>
            </S.TableCell>
          </S.TableRow>
        ))}
      </tbody>
    </S.Table>
  );
}

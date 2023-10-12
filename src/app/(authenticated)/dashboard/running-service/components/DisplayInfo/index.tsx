import { Container } from './styles';

interface Service {
    id: number;
    client_name: string;
    city: string;
    address: string;
    nomenclature: string;
    classification: string;
    created_at: string;
    protocol: string;
}

export function DisplayInfo({ service }: {service: Service}) {
    const now = new Date(service.created_at);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const createdAt = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return (
        <Container>
            <div>
                <p>Solicitante: {service?.client_name}</p>
                <p>Cidade: {service?.city}</p>
                <p>Endereço de origem do serviço: {service?.address}</p>
                <p>Nomenclatura de caixa ou cabo: {service?.nomenclature}</p>
                <p>Classe: {service?.classification}</p>
                <p>Protocolo: {service?.protocol}</p>
                <p>Início: {createdAt}</p>
                <p>Status do serviço: Em andamento</p>
                <p>Atualização: 0</p>
            </div>
        </Container>
    )
}
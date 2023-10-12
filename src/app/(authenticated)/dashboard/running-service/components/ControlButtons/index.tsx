import { ButtonFinish, Container } from './styles'

export function ControlButtons({ slug }: { slug: string }) {
    return (
        <Container>
            <ButtonFinish href={`/dashboard/finish-service/${slug}`}><span>Finalizar</span></ButtonFinish>
            <button>Pausar</button>
            <button>Cancerlar</button>
        </Container>
    )
}
import { Spinner } from './components/Spinner';
import { Container, Wrapper } from './styles';

export function FullScreenLoading({ message = '' }) {
    return (
        <Container>
            <Wrapper>
                <Spinner />
                <span dangerouslySetInnerHTML={{ __html: message }}/>
            </Wrapper>
        </Container>
    )
}
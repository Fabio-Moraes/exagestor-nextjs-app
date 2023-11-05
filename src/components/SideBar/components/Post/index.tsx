'use client';

import { Body, Container, Content, Description, ImageContent } from './styles';

interface propsType {
    ImageUrl: string;
    description?: string;
}

export function Post({ ImageUrl, description }: propsType) {
    return (
        <Container>
            <Body>
                <Content>
                    {description && <Description>{description}</Description>}
                    <ImageContent src={ImageUrl} />
                    {/* <Icons>
            <FacebookShareButton
              quote={'234234234234'}
              url={'https://viveiromatanativa.com.br'}
              hashtag={'#VIVEIROMATANATIVA'}
            >
              <Status>
                <FacebookIcon />
                facebook
              </Status>
            </FacebookShareButton>

            <TwitterShareButton
              title={`🌳${description}\n`}
              url={'https://viveiromatanativa.com.br'}
              hashtags={['VIVEIROMATANATIVA', 'IPÊ']}
            >
              <Status>
                <TwitterIcon />
                Twitter
              </Status>
            </TwitterShareButton>
          </Icons> */}
                </Content>
            </Body>
        </Container>
    );
}

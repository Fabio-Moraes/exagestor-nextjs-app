import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 32, height: 32 };

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '9px',
                        background: '#27A567',
                        transform: 'rotate(50deg)'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '9px',
                        background: '#27A567',
                        transform: 'rotate(-50deg)'
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
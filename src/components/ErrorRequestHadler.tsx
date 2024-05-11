
import { FC } from 'react'

export const ErrorRequestHandler: FC<{errorMessage: string}> = ({errorMessage}) => {
    return (
        <>
         {errorMessage && <p style={{ color: 'red' }}>Ошибка: {errorMessage}</p>}
        </>
    )
}
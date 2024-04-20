
export function ErrorRequestHandler({errorMessage}) {
    return (
        <>
         {errorMessage && <p style={{ color: 'red' }}>Ошибка: {errorMessage}</p>}
        </>
    )
}
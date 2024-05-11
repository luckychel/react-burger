import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {

    public state: State = {
      hasError: false,
      error: null, 
      errorInfo: null 
    };

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    public static getDerivedStateFromError(_: Error) {
      return { hasError: true };
    } 
  
    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
  
    render() {
      if (this.state?.hasError) {
        // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
        return (
          <section className='p-10'>
            <h1>Что-то пошло не так :(</h1>
            <p>
              В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
            </p>
            <>
            {(this.state.error instanceof Error ? 
              
                <details style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error && this.state.error?.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </details>

            : (<></>))}
            </>
          </section>
        );
      }
      // если всё работает штатно, рендерим дочерние компоненты
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
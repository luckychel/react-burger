import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
  
    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error, errorInfo) {
      //console.log("Возникла ошибка!", error, errorInfo);
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
  
    render() {
      if (this.state.hasError) {
        // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
        return (
          <section className='p-10'>
            <h1>Что-то пошло не так :(</h1>
            <p>
              В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
            </p>

            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error?.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          </section>
        );
      }
      // если всё работает штатно, рендерим дочерние компоненты
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
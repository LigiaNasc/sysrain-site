document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sysrain-form');
    const mensagem = document.getElementById('mensagem-envio');
  
    // Máscara para WhatsApp
    const whatsappInput = document.querySelector('input[name="entry.179990010"]');
    if (whatsappInput) {
      IMask(whatsappInput, {
        mask: '(00) 00000-0000'
      });
    }
  
    // Máscara para nome e cidade (só letras e espaços)
    const apenasTexto = (value) => value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  
    const nomeInput = document.querySelector('input[name="entry.1772260409"]');
    const cidadeInput = document.querySelector('input[name="entry.2028141425"]');
  
    [nomeInput, cidadeInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.value = apenasTexto(input.value);
        });
      }
    });
  
    // Envio do formulário para Google Forms
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const data = new FormData(form);
  
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSffoIQE1S4Yex3bVayVtMGpGRlQVCf_pka5a1y2tUM4wJipaA/formResponse', {
          method: 'POST',
          mode: 'no-cors',
          body: data
        })
          .then(() => {
            form.reset();
            if (mensagem) mensagem.style.display = 'block';
          })
          .catch(() => {
            alert('Ocorreu um erro ao enviar. Tente novamente.');
          });
      });
    }
  });
  
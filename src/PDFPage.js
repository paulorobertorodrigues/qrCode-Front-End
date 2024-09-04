import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Certificado.css';
import html2pdf from 'html2pdf.js';
import { QRCodeCanvas } from 'qrcode.react';

function PDFPage() {
  const location = useLocation();
  const { id, data, revisao, codigo, validade, responsavel, registro } = location.state || {};

  const generatePDF = () => {
    const element = document.getElementById('todo');

    // Ocultar o botão antes de gerar o PDF
    const button = document.getElementById('pdf-button');
    button.style.display = 'none';

    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: 'certificado.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .save()
      .finally(() => {
        // Mostrar o botão novamente após a geração do PDF
        button.style.display = 'block';
      });
  };

   const currentUrl = window.location.href; // URL atual da página

  


  return (
    <div className="container" id="todo">
      <div className="card text-center">
        <div className="card-header d-flex justify-content-between align-items-center">
          <img className="rounded float-left" src="./Images/logo_g8.png" width="200" height="100" alt="Logo" />
          <QRCodeCanvas value={currentUrl} size={100} className="float-right" /> {/* QR code alinhado à direita */}
        </div>
        <div className="d-flex justify-content-center m-4">
          <h2><i>Certificado de Autenticidade</i></h2>
        </div>
        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              {/* Convertendo a data do formato Americano para Portugues Brasil */}
              <p>Data da Elaboração do Documento <br /><strong>{new Date(data).toLocaleDateString('pt-BR')}</strong></p>
            </div>
            <div className="col">
              <p>Revisão do Documento <br /><strong>{revisao}</strong></p>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              <p>Código do Documento<br /><strong>{codigo}</strong></p>
            </div>
            <div className="col">
              {/* Convertendo a data do formato Americano para Portugues Brasil */}
              <p>Validade<br /><strong>{new Date(validade).toLocaleDateString('pt-BR')}</strong></p>
            </div>
          </div>
        </div>

        <div className="container text-center">
          <div className="row row-cols-1">
            <div className="col">
              <p>Descrição do Documento</p>
            </div>
            <div className="col">
              <h6><strong>PGR - PROGRAMA DE GERENCIAMENTO DE RISCOS</strong></h6><br/>
            </div>
          </div>
        </div>

        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              <p>Responsável Técnico<br /><strong>{responsavel}</strong></p>
            </div>
            <div className="col">
              <p>Registro Profissional<br /><strong>CREA: {registro}</strong></p>
            </div>
          </div>
        </div><br/><br/>

        <div className="container custom-container">
          <div className="row row-cols-2">
            <div className="col custom-margin">
              <p className="mb-0"><strong>G8 Consultoria, Assessoria & Treinamento</strong></p>
              <div className="cnpj">
                <p className="mb-0">CNPJ: 17.819.089/000115</p>
                <p className="mb-0">Web-site: <a href="https://www.g8online.com.br" className="stretched-link" target="_blank">https://www.g8online.com.br</a></p>
                <p className="mb-0">E-mail: <a href="mailto:g8@g8online.com.br" className="stretched-link" target="_blank">g8@g8online.com.br</a></p>
              </div>
            </div>
            <div className="col" id="logo-certified">
              <img className="rounded float-end me-3" src="./Images/certified.png" width="130" height="130" alt="Certified Logo" />
            </div>
          </div>
        </div>
      </div>
      <button id="pdf-button" onClick={generatePDF} className="btn btn-primary mt-4">Baixar PDF</button>
    </div>
  );
}

export default PDFPage;

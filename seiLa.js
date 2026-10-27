/*
 * Atividade: Callbacks em JavaScript
 */

// PASSO 2: Função mestra com callback síncrona
function processarTransacaoPix(chavePix, valor, callbackAcao) {
    console.log("\n--- Processando transação PIX ---");

    // Validação do valor
    if (valor <= 0) {
        console.error("Erro: o valor da transação deve ser maior que zero.");
        return;
    }

    // Criação do objeto da transação
    const transacao = {
        id: Math.floor(Math.random() * 100000),
        chavePix,
        valor,
        data: new Date().toLocaleTimeString()
    };

    console.log("Transação criada com sucesso!");
    console.log(`ID: ${transacao.id}`);
    console.log(`Valor: R$ ${transacao.valor.toFixed(2)}`);

    // Executa a callback recebida
    callbackAcao(transacao);
}

function emitirComprovantePorEmail(transacao) {
    console.log("\n--- Comprovante por e-mail ---");
    console.log(`Prezado(a) cliente,`);
    console.log(`Sua transação PIX foi processada.`);
    console.log(`ID da transação: ${transacao.id}`);
    console.log(`Valor transferido: R$ ${transacao.valor.toFixed(2)}`);
    console.log(`Destinatário (chave PIX): ${transacao.chavePix}`);
    console.log(`Data: ${transacao.data}`);
    console.log("Atenciosamente, equipe financeira.");
}

function creditarCashback(transacao) {
    const cashback = transacao.valor * 0.02;

    console.log("\n--- Cashback ---");
    console.log(`Valor da transação: R$ ${transacao.valor.toFixed(2)}`);
    console.log(`Cashback de 2%: R$ ${cashback.toFixed(2)}`);
    console.log("Bônus concedido com sucesso!");
}

function auditarTransacaoSuspeita(transacao) {
    console.log("\n--- Análise antifraude ---");

    if (transacao.valor > 5000) {
        console.warn(
            `🚩 BANDEIRA VERMELHA: transação de R$ ${transacao.valor.toFixed(2)} ` +
            "encaminhada para análise antifraude."
        );
    } else {
        console.log("Transação sem alerta pelo critério de valor.");
    }
}


processarTransacaoPix(
    "cliente@email.com",
    250,
    emitirComprovantePorEmail
);

processarTransacaoPix(
    "123.456.789-00",
    1000,
    creditarCashback
);

processarTransacaoPix(
    "empresa@pix.com",
    7500,
    auditarTransacaoSuspeita
);

processarTransacaoPix(
    "cliente@pix.com",
    100,
    (transacao) => {
        const desconto = 5;
        const valorFinal = transacao.valor - desconto;

        console.log("\n--- Aplicação de desconto ---");
        console.log(`Valor original: R$ ${transacao.valor.toFixed(2)}`);
        console.log(`Desconto: R$ ${desconto.toFixed(2)}`);
        console.log(`Valor final: R$ ${valorFinal.toFixed(2)}`);
    }
);

processarTransacaoPix(
    "cliente@pix.com",
    0,
    emitirComprovantePorEmail
);


function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
    console.log("\n--- Notificação via webhook ---");
    console.log(`Webhook agendado às ${new Date().toLocaleTimeString()}`);
    console.log("Aguardando 2 segundos para simular a comunicação...");

    setTimeout(() => {
        console.log(
            `Webhook executado às ${new Date().toLocaleTimeString()}`
        );
        console.log(
            `Notificação enviada para a transação ${transacao.id}.`
        );

        callbackFinalizacao(transacao);
    }, 2000);
}

processarTransacaoPix(
    "loja@pix.com",
    350,
    (transacao) => {
        enviarWebhookAssincrono(transacao, (transacaoFinalizada) => {
            console.log(
                `Finalização confirmada para a transação ${transacaoFinalizada.id}.`
            );
        });
    }
);
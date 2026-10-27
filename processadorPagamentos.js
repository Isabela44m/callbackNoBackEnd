
function processarTransacaoPix(chavePix, valor, callbackAcao) {
    if (valor <= 0) {
        console.log("Erro: o valor da transação deve ser maior que zero.");
        return;
    }

    const transacao = {
        id: Math.floor(Math.random() * 100000),
        chavePix,
        valor,
        data: new Date().toLocaleTimeString()
    };

    console.log("\nProcessando transação PIX...");
    console.log("ID:", transacao.id);
    console.log("Valor: R$", transacao.valor);
    console.log("Data:", transacao.data);


    callbackAcao(transacao);

    return transacao;
}


function emitirComprovantePorEmail(transacao) {
    console.log(
        `Comprovante enviado com sucesso. ` +
        `ID: ${transacao.id} | ` +
        `Valor: R$ ${transacao.valor.toFixed(2)} | ` +
        `Destinatário: ${transacao.chavePix}`
    );
}


function creditarCashback(transacao) {
    const cashback = transacao.valor * 0.02;

    console.log(
        `Cashback concedido: R$ ${cashback.toFixed(2)}`
    );
}


function auditarTransacaoSuspeita(transacao) {
    if (transacao.valor > 5000) {
        console.log(
            `ALERTA: Bandeira vermelha! ` +
            `Transação de R$ ${transacao.valor.toFixed(2)} ` +
            `encaminhada para análise antifraude.`
        );
    } else {
        console.log(
            "Transação sem alerta de valor elevado."
        );
    }
}



console.log("\n===== TESTE 1: COMPROVANTE =====");
processarTransacaoPix(
    "cliente@email.com",
    150,
    emitirComprovantePorEmail
);

console.log("\n===== TESTE 2: CASHBACK =====");
processarTransacaoPix(
    "123.456.789-00",
    250,
    creditarCashback
);

console.log("\n===== TESTE 3: AUDITORIA =====");
const transacaoAuditoria = processarTransacaoPix(
    "empresa@email.com",
    6500,
    auditarTransacaoSuspeita
);

console.log("\n===== TESTE 4: ARROW FUNCTION =====");
processarTransacaoPix(
    "cliente@email.com",
    100,
    (transacao) => {
        const valorComDesconto = transacao.valor - 5;

        console.log(
            `Valor original: R$ ${transacao.valor.toFixed(2)}`
        );
        console.log(
            `Desconto aplicado: R$ 5,00`
        );
        console.log(
            `Valor final: R$ ${valorComDesconto.toFixed(2)}`
        );
    }
);


function enviarWebhookAssincrono(
    transacao,
    callbackFinalizacao
) {
    console.log(
        `Webhook agendado para a transação ${transacao.id}.`
    );

    setTimeout(() => {
        console.log(
            `Webhook executado após 2 segundos para a transação ${transacao.id}.`
        );

        callbackFinalizacao(transacao);
    }, 2000);
}


console.log("\n===== TESTE 5: WEBHOOK ASSÍNCRONO =====");

if (transacaoAuditoria) {
    enviarWebhookAssincrono(
        transacaoAuditoria,
        (transacao) => {
            console.log(
                `Notificação finalizada para a transação ${transacao.id}.`
            );
        }
    );
}

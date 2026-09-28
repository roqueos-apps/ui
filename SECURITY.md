# Segurança

## Como reportar

Não abra issue pública para falha de segurança. Use o
[relatório privado de vulnerabilidade](https://github.com/roqueos-apps/ui/security/advisories/new)
do GitHub. A resposta vem em até sete dias. A política completa está no
[SECURITY da roqueos-apps](https://github.com/roqueos-apps/.github/blob/main/SECURITY.md).

## O que vale aqui

O kit entra dentro de cada app, e o app roda **na mesma origem** do RoqueOS. Um defeito aqui
chega a todo app que usa o kit, então o que protege quem usa o RoqueOS é:

- todo merge passa pela revisão do mantenedor (`CODEOWNERS`), e todo commit tem
  `Signed-off-by`;
- o app e o RoqueOS instalam o kit por uma tag exata, com o commit travado no lockfile;
- nenhum script roda sozinho no install, e o `app check --sdk` reprova se aparecer um;
- o kit só importa `vue` e arquivo dele, não guarda nada, não fala com rede, servidor ou
  banco, e não mexe no `document` fora do app (um teste reprova cada uma dessas coisas);
- o texto que o kit mostra vem por prop e é escrito como texto, nunca como HTML;
- o CI de pull request não lê segredo nenhum.

---

## Security (English)

Do not open public issues for vulnerabilities; use GitHub's private vulnerability reporting.
The kit runs inside every app that uses it, on the same origin as RoqueOS. Protection comes
from maintainer review and signed-off commits, exact version pins, no install-time scripts,
no imports other than `vue`, no storage, network, server or database access, no changes to
the document outside the app, text rendered as text (never HTML), and secret-free CI.

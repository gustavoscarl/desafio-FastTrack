# Acesse o site [Aqui](https://gustavoscarl.github.io/desafio-FastTrack/)


## ATENÇÃO!!
As URLs do site estão sendo redirecionados para a URL direta do GitHub Pages, por limitações do servidor de acessar caminhos relativos. Por exemplo, ao clicar no botão de logar ou criar conta, o usuário será redirecionado ao site construído no GitHub Pages, mesmo que baixe os arquivos e abra na própria máquina, via Live Server ou VSCODE.

Caso precisem de alterações, procurar pelos comandos window.location.replace('URL AQUI') e modificar por window.location.href = 'caminho relativo aqui', ou me contatar pelo email gustavolucianelli993@gmail.com, para fornecer a versão que funcione 100% em Live Server.


## Limitações óbvias

### 1ª:
Na versão Mobile (abaixo de 434px), a tabela gera uma barra de rolagem horizontal nela mesma, de acordo com a classe do bootstrap '.table-responsive'. Apesar de não ser o ideal, uma aproximação com modificação estrutural de tabela para uma estrutura feita em divs demoraria mais tempo e demandaria mais pensamento de design, o que não acredito ser o foco do site.

Por enquanto, a solução é clicar em cima da tabela e arrastar para o lado que deseja posicionar a mesma.

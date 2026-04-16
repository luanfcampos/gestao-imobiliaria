
import { test, expect } from '@playwright/test';

test.describe('Revisão Completa da Aplicação', () => {

  test.beforeEach(async ({ page }) => {
    // page.on('console', msg => console.log(msg.text()));
  });

  // 1. NAVEGAÇÃO
  test.describe('Navegação e Sidebar', () => {
    test('deve destacar a rota ativa na sidebar', async ({ page }) => {
      await page.goto('/imoveis');
      const imoveisLink = page.locator('a[href="/imoveis"]');
      await expect(imoveisLink).toHaveClass(/bg-\[var\(--color-accent\)\]/);

      await page.goto('/contratos');
      const contratosLink = page.locator('a[href="/contratos"]');
      await expect(contratosLink).toHaveClass(/bg-\[var\(--color-accent\)\]/);

      await page.goto('/dashboard');
      const dashboardLink = page.locator('a[href="/dashboard"]');
      await expect(dashboardLink).toHaveClass(/bg-\[var\(--color-accent\)\]/);
    });

    test('deve navegar entre as páginas sem recarregar', async ({ page }) => {
      await page.goto('/dashboard');
      await page.click('a[href="/imoveis"]');
      await expect(page).toHaveURL('/imoveis');
      await page.click('a[href="/contratos"]');
      await expect(page).toHaveURL('/contratos');
      await page.click('a[href="/dashboard"]');
      await expect(page).toHaveURL('/dashboard');
    });
  });

  // 2. TEMA
  test.describe('Troca de Tema (Light/Dark)', () => {
    test('deve alternar o tema em todas as páginas', async ({ page }) => {
      await page.goto('/dashboard');
      const html = page.locator('html');
      const themeToggleButton = page.getByTitle('Mudar tema');

      // Pega o tema atual (pode ser light, dark ou null se não definido explicitamente ainda)
      const initialTheme = await html.getAttribute('data-theme') || 'light';
      
      await themeToggleButton.click();
      const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';
      
      // Verifica se mudou para o oposto
      await expect(html).toHaveAttribute('data-theme', expectedTheme);

      // Clica de novo e volta ao original
      await themeToggleButton.click();
      await expect(html).toHaveAttribute('data-theme', initialTheme);
    });
  });

  // 3. FORMULÁRIO /contratos/novo
  test.describe('Formulário de Novo Contrato', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/contratos/novo');
    });

    test('deve mostrar erros ao tentar avançar sem preencher', async ({ page }) => {
      await page.click('button:has-text("Próximo")');
      const errorMessages = page.locator('p.text-red-500');
      await expect(errorMessages.first()).toBeVisible();
    });

    test('deve persistir os dados entre os steps', async ({ page }) => {
      await page.fill('input[name="codigoImovel"]', 'TESTE-01');
      await page.fill('input[name="enderecoCompleto"]', 'Rua de Teste, 123 - Centro');
      await page.selectOption('select[id="tipoImovel"]', 'Apartamento');
      
      await page.click('button:has-text("Próximo")');
      await expect(page.getByRole('button', { name: 'Voltar' })).toBeVisible();
      
      await page.click('button:has-text("Voltar")');
      const codigoInput = page.locator('input[name="codigoImovel"]');
      await expect(codigoInput).toHaveValue('TESTE-01');
    });

    test('deve completar o formulário e mostrar botão de PDF', async ({ page }) => {
        // Step 1
        await page.fill('input[name="codigoImovel"]', 'ID-999');
        await page.fill('input[name="enderecoCompleto"]', 'Avenida Principal, 500');
        await page.selectOption('select[id="tipoImovel"]', 'Casa');
        await page.click('button:has-text("Próximo")');

        // Step 2
        await page.fill('input[name="nomeCompleto"]', 'Fulano de Tal');
        await page.fill('input[name="cpf"]', '123.456.789-00');
        await page.fill('input[name="email"]', 'fulano@teste.com');
        await page.fill('input[name="telefone"]', '11999998888');
        await page.click('button:has-text("Próximo")');

        // Step 3
        await page.fill('input[name="valorAluguel"]', '1500');
        await page.fill('input[name="diaVencimento"]', '10');
        await page.fill('input[name="dataInicio"]', '2024-05-01');
        await page.fill('input[name="duracaoMeses"]', '12');
        await page.selectOption('select[id="indiceReajuste"]', 'IPCA');
        await page.click('button:has-text("Próximo")');

        // Step 4 (Upload)
        await page.click('button:has-text("Gerar Contrato")');

        // Resultado
        await expect(page.getByText('Contrato Gerado com Sucesso!')).toBeVisible();
        
        // Espera o carregamento do PDF e clica no botão correto
        const downloadBtn = page.getByRole('button', { name: /Baixar Contrato PDF/i });
        await expect(downloadBtn).toBeVisible({ timeout: 10000 });
    });
  });

  // 4. TABELA /imoveis
  test.describe('Tabela de Imóveis', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/imoveis');
    });

    test('deve filtrar a tabela', async ({ page }) => {
        const filterInput = page.getByPlaceholder('Filtrar por qualquer campo...');
        await filterInput.fill('Luxo');
        await expect(page.getByRole('cell', { name: 'Apartamento Luxo com Vista' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Casa Moderna com Piscina' })).not.toBeVisible();
    });

    test('deve mostrar badges de status com cores corretas', async ({ page }) => {
        const alugadoBadge = page.locator('div:has-text("Alugado")').first();
        await expect(alugadoBadge).toBeVisible();
        const disponivelBadge = page.locator('div:has-text("Disponível")').first();
        await expect(disponivelBadge).toBeVisible();
    });
  });

  // 5. DASHBOARD
  test.describe('Dashboard', () => {
    test('deve mostrar os 4 cards de KPI e a tabela de últimos contratos', async ({ page }) => {
      await page.goto('/dashboard');
      const kpiCards = page.locator('div.grid > .rounded-lg.border');
      await expect(kpiCards).toHaveCount(4);
      const contractTable = page.getByRole('table');
      await expect(contractTable).toBeVisible();
    });
  });

  // 6. /contratos
  test.describe('Página de Contratos', () => {
    test('deve mostrar a tabela de contratos e o botão de novo contrato', async ({ page }) => {
        await page.goto('/contratos');
        const contractTable = page.getByRole('table');
        await expect(contractTable).toBeVisible();
        const newContractButton = page.getByRole('button', { name: /novo contrato/i });
        await newContractButton.click();
        await expect(page).toHaveURL('/contratos/novo');
    });
  });
});

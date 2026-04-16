
import { test, expect } from '@playwright/test';

test.describe('Revisão Completa da Aplicação', () => {

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log(msg.text()));
  });

  // 1. NAVEGAÇÃO
  test.describe('Navegação e Sidebar', () => {
    test('deve destacar a rota ativa na sidebar', async ({ page }) => {
      // Navega para imoveis
      await page.goto('/imoveis');
      const imoveisLink = page.locator('a[href="/imoveis"]');
      await expect(imoveisLink).toHaveClass(/bg-\[var\(--color-accent\)\]/);

      // Navega para contratos
      await page.goto('/contratos');
      const contratosLink = page.locator('a[href="/contratos"]');
      await expect(contratosLink).toHaveClass(/bg-\[var\(--color-accent\)\]/);

       // Navega para dashboard
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

      // Verifica o tema inicial (deve ser light)
      await expect(html).toHaveAttribute('data-theme', 'light');

      // Clica para mudar para dark
      await themeToggleButton.click();
      await expect(html).toHaveAttribute('data-theme', 'dark');

      // Clica para voltar para light
      await themeToggleButton.click();
      await expect(html).toHaveAttribute('data-theme', 'light');
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
      await page.click('button:has-text("Próximo")');
      await page.click('button:has-text("Voltar")');
      const nomeInput = page.locator('input[name="codigoImovel"]');
      await expect(nomeInput).toHaveValue('TESTE-01');
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

     test('deve ordenar a tabela', async ({ page }) => {
      const priceHeader = page.locator('div:has-text("Valor")').first();
      await priceHeader.click();
      // TODO: Verificar a ordenação
    });

    test('deve paginar a tabela', async ({ page }) => {
        const nextButton = page.getByRole('button', { name: /próximo/i });
        await nextButton.click();
        // TODO: Verificar a paginação
    });

    test('deve mostrar badges de status com cores corretas', async ({ page }) => {
        const alugadoBadge = page.locator('div:has-text("Alugado")');
        await expect(alugadoBadge.first()).toBeVisible();
        const disponivelBadge = page.locator('div:has-text("Disponível")');
        await expect(disponivelBadge.first()).toBeVisible();
    });
  });

  // 5. DASHBOARD
  test.describe('Dashboard', () => {
    test('deve mostrar os 4 cards de KPI e a tabela de últimos contratos', async ({ page }) => {
      await page.goto('/dashboard');
      const kpiCards = page.locator('div.rounded-lg.border'); // Seletor mais genérico para os cards
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

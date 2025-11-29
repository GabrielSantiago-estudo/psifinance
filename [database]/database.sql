DROP SCHEMA IF EXISTS psifinance;
CREATE SCHEMA IF NOT EXISTS psifinance;
USE psifinance;

-- ========================================
-- PSICÓLOGOS
-- ========================================
CREATE TABLE psicologos (
    psicologo_id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    crp VARCHAR(50) NOT NULL,
    avatar_url TEXT,
    especializacao VARCHAR(150),
    dark_mode BOOLEAN DEFAULT FALSE,
    notificacoes_email BOOLEAN DEFAULT TRUE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (psicologo_id)
);

-- ========================================
-- CLIENTES
-- ========================================
CREATE TABLE clientes (
    cliente_id INT NOT NULL AUTO_INCREMENT,
    psicologo_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    tipo_sessao ENUM('Individual', 'Casal', 'Familia') NOT NULL,
    valor_sessao DECIMAL(10,2) NOT NULL,
    status_pagamento ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(cliente_id),
    FOREIGN KEY(psicologo_id) REFERENCES psicologos(psicologo_id)
);

-- ========================================
-- METAS
-- ========================================
CREATE TABLE metas (
    meta_id INT NOT NULL AUTO_INCREMENT,
    psicologo_id INT NOT NULL,
    tipo_meta ENUM('Receita Mensal', 'Receita Anual', 'Sessoes Mensais') NOT NULL,
    valor_alvo DECIMAL(10,2),
    sessoes_alvo INT,
    ativa BOOLEAN DEFAULT TRUE,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(meta_id),
    FOREIGN KEY(psicologo_id) REFERENCES psicologos(psicologo_id)
);

-- ========================================
-- SESSÕES
-- ========================================
CREATE TABLE sessoes (
    sessao_id INT NOT NULL AUTO_INCREMENT,
    psicologo_id INT NOT NULL,
    cliente_id INT NOT NULL,
    data_sessao DATE NOT NULL,
    horario TIME NOT NULL,
    tipo ENUM('Individual', 'Casal', 'Familia') NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status ENUM('Confirmado', 'Pendente', 'Completo', 'Cancelado') DEFAULT 'Pendente',
    local_atendimento VARCHAR(150),
    lembrete_enviado BOOLEAN DEFAULT FALSE,
    observacoes TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(sessao_id),
    FOREIGN KEY(psicologo_id) REFERENCES psicologos(psicologo_id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(cliente_id)
);

-- ========================================
-- TRANSAÇÕES
-- ========================================
CREATE TABLE transacoes (
    transacao_id INT NOT NULL AUTO_INCREMENT,
    psicologo_id INT NOT NULL,
    sessao_id INT,
    tipo ENUM('Despesa', 'Receita') NOT NULL,
    categoria VARCHAR(100),
    valor DECIMAL(10,2) NOT NULL,
    data_transacao DATE NOT NULL,
    status ENUM('Completo', 'Pendente', 'Cancelado') DEFAULT 'Pendente',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(transacao_id),
    FOREIGN KEY(psicologo_id) REFERENCES psicologos(psicologo_id),
    FOREIGN KEY(sessao_id) REFERENCES sessoes(sessao_id)
);
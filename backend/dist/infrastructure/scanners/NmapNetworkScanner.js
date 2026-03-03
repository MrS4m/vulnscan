"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NmapNetworkScanner = void 0;
const ScanResult_1 = require("../../domain/entities/ScanResult");
const ScanType_1 = require("../../domain/enums/ScanType");
const Vulnerability_1 = require("../../domain/entities/Vulnerability");
const PortInfo_1 = require("../../domain/entities/PortInfo");
const SeverityLevel_1 = require("../../domain/value-objects/SeverityLevel");
class NmapNetworkScanner {
    constructor() {
        this.knowledgeBase = [
            // FTP - Port 21
            {
                port: 21,
                protocol: 'tcp',
                service: 'FTP',
                version: 'vsftpd 3.0.3',
                risk: SeverityLevel_1.SeverityLevel.HIGH,
                details: 'File Transfer Protocol — transmite credenciais em texto plano',
                vulnerabilities: [
                    {
                        name: 'FTP Clear-Text Authentication',
                        description: 'FTP transmite credenciais (usuário e senha) em texto plano, permitindo interceptação via sniffing de rede.',
                        severity: SeverityLevel_1.SeverityLevel.HIGH,
                        category: 'Credential Exposure',
                        mitigation: 'Substituir FTP por SFTP (SSH File Transfer Protocol) ou FTPS (FTP over TLS). Desativar FTP se não for necessário.',
                        reference: 'https://attack.mitre.org/techniques/T1071/002/',
                    },
                    {
                        name: 'Anonymous FTP Access',
                        description: 'Servidores FTP mal configurados podem permitir acesso anônimo, expondo arquivos sensíveis.',
                        severity: SeverityLevel_1.SeverityLevel.MEDIUM,
                        category: 'Access Control',
                        mitigation: 'Desativar login anônimo. Configurar autenticação forte e restringir diretórios acessíveis.',
                    },
                ],
            },
            // SSH - Port 22
            {
                port: 22,
                protocol: 'tcp',
                service: 'SSH',
                version: 'OpenSSH 8.9p1',
                risk: SeverityLevel_1.SeverityLevel.MEDIUM,
                details: 'Secure Shell — acesso remoto criptografado',
                vulnerabilities: [
                    {
                        name: 'SSH Brute Force Exposure',
                        description: 'Porta SSH exposta à internet pode ser alvo de ataques de brute force para descoberta de credenciais.',
                        severity: SeverityLevel_1.SeverityLevel.MEDIUM,
                        category: 'Authentication',
                        mitigation: 'Implementar fail2ban, usar autenticação por chave pública, desativar login por senha, alterar porta padrão, usar port knocking.',
                        reference: 'https://attack.mitre.org/techniques/T1110/',
                    },
                    {
                        name: 'Weak SSH Algorithms',
                        description: 'Versões antigas do SSH podem suportar algoritmos criptográficos fracos (CBC, SHA1, diffie-hellman-group1).',
                        severity: SeverityLevel_1.SeverityLevel.LOW,
                        category: 'Cryptography',
                        mitigation: 'Atualizar OpenSSH. Configurar apenas algoritmos fortes no sshd_config (chacha20, aes256-gcm, curve25519).',
                    },
                ],
            },
            // Telnet - Port 23
            {
                port: 23,
                protocol: 'tcp',
                service: 'Telnet',
                version: 'Linux telnetd',
                risk: SeverityLevel_1.SeverityLevel.CRITICAL,
                details: 'Telnet — protocolo legado sem criptografia',
                vulnerabilities: [
                    {
                        name: 'Telnet Unencrypted Protocol',
                        description: 'Telnet transmite TODOS os dados, incluindo credenciais, em texto plano. Extremamente inseguro.',
                        severity: SeverityLevel_1.SeverityLevel.CRITICAL,
                        category: 'Credential Exposure',
                        mitigation: 'Desativar Telnet imediatamente. Substituir por SSH para todos os acessos remotos.',
                        reference: 'https://attack.mitre.org/techniques/T1021/001/',
                    },
                ],
            },
            // SMTP - Port 25
            {
                port: 25,
                protocol: 'tcp',
                service: 'SMTP',
                version: 'Postfix smtpd',
                risk: SeverityLevel_1.SeverityLevel.MEDIUM,
                details: 'Simple Mail Transfer Protocol — servidor de e-mail',
                vulnerabilities: [
                    {
                        name: 'Open SMTP Relay',
                        description: 'Servidor SMTP pode estar configurado como relay aberto, permitindo envio de spam e phishing.',
                        severity: SeverityLevel_1.SeverityLevel.HIGH,
                        category: 'Misconfiguration',
                        mitigation: 'Configurar restrição de relay. Implementar SPF, DKIM e DMARC. Exigir autenticação para envio.',
                        reference: 'https://attack.mitre.org/techniques/T1566/',
                    },
                    {
                        name: 'SMTP User Enumeration',
                        description: 'Comandos VRFY e EXPN podem ser usados para enumerar usuários válidos no servidor de e-mail.',
                        severity: SeverityLevel_1.SeverityLevel.MEDIUM,
                        category: 'Information Disclosure',
                        mitigation: 'Desativar comandos VRFY e EXPN no servidor SMTP.',
                    },
                ],
            },
            // HTTP - Port 80
            {
                port: 80,
                protocol: 'tcp',
                service: 'HTTP',
                version: 'Apache httpd 2.4.52',
                risk: SeverityLevel_1.SeverityLevel.MEDIUM,
                details: 'Hypertext Transfer Protocol — servidor web sem criptografia',
                vulnerabilities: [
                    {
                        name: 'Unencrypted HTTP Traffic',
                        description: 'Tráfego HTTP não está criptografado, permitindo interceptação de dados sensíveis (MitM).',
                        severity: SeverityLevel_1.SeverityLevel.MEDIUM,
                        category: 'Transport Security',
                        mitigation: 'Implementar HTTPS com TLS 1.2+. Redirecionar todo tráfego HTTP para HTTPS. Configurar HSTS.',
                    },
                    {
                        name: 'Server Version Disclosure',
                        description: 'O header Server expõe versão do Apache, facilitando busca por exploits específicos.',
                        severity: SeverityLevel_1.SeverityLevel.LOW,
                        category: 'Information Disclosure',
                        mitigation: 'Configurar ServerTokens Prod e ServerSignature Off no Apache.',
                    },
                ],
            },
            // HTTPS - Port 443
            {
                port: 443,
                protocol: 'tcp',
                service: 'HTTPS',
                version: 'nginx 1.24.0',
                risk: SeverityLevel_1.SeverityLevel.LOW,
                details: 'HTTP over TLS — servidor web criptografado',
                vulnerabilities: [
                    {
                        name: 'TLS Version Support',
                        description: 'Suporte a versões antigas de TLS (1.0, 1.1) pode expor a ataques como POODLE e BEAST.',
                        severity: SeverityLevel_1.SeverityLevel.MEDIUM,
                        category: 'Cryptography',
                        mitigation: 'Desativar TLS 1.0 e 1.1. Usar apenas TLS 1.2 e 1.3. Configurar cipher suites fortes.',
                        reference: 'https://attack.mitre.org/techniques/T1557/',
                    },
                ],
            },
            // SMB - Port 445
            {
                port: 445,
                protocol: 'tcp',
                service: 'SMB',
                version: 'Samba smbd 4.15.0',
                risk: SeverityLevel_1.SeverityLevel.CRITICAL,
                details: 'Server Message Block — compartilhamento de arquivos Windows',
                vulnerabilities: [
                    {
                        name: 'SMB Exposed to Network',
                        description: 'SMB exposto pode ser explorado para movimento lateral, execução remota de código (EternalBlue) e ransomware.',
                        severity: SeverityLevel_1.SeverityLevel.CRITICAL,
                        category: 'Remote Code Execution',
                        mitigation: 'Bloquear porta 445 no firewall externo. Desativar SMBv1. Aplicar patches de segurança. Restringir acesso por rede.',
                        cveId: 'CVE-2017-0144',
                        reference: 'https://attack.mitre.org/techniques/T1021/002/',
                    },
                    {
                        name: 'SMB Null Session',
                        description: 'Sessões null no SMB podem permitir enumeração de usuários, compartilhamentos e políticas.',
                        severity: SeverityLevel_1.SeverityLevel.HIGH,
                        category: 'Information Disclosure',
                        mitigation: 'Desativar sessões null. Configurar RestrictAnonymous=1 ou 2 no registro do Windows.',
                    },
                ],
            },
            // MySQL - Port 3306
            {
                port: 3306,
                protocol: 'tcp',
                service: 'MySQL',
                version: 'MySQL 8.0.32',
                risk: SeverityLevel_1.SeverityLevel.HIGH,
                details: 'MySQL Database Server — banco de dados relacional',
                vulnerabilities: [
                    {
                        name: 'Database Exposed to Network',
                        description: 'Banco de dados MySQL acessível pela rede pode ser alvo de ataques de brute force e SQL injection direta.',
                        severity: SeverityLevel_1.SeverityLevel.HIGH,
                        category: 'Access Control',
                        mitigation: 'Restringir bind-address para 127.0.0.1. Usar firewalls para limitar acesso. Não expor à internet.',
                        reference: 'https://attack.mitre.org/techniques/T1190/',
                    },
                    {
                        name: 'Default MySQL Credentials',
                        description: 'Credenciais padrão (root sem senha) podem estar habilitadas, permitindo acesso total ao banco.',
                        severity: SeverityLevel_1.SeverityLevel.CRITICAL,
                        category: 'Authentication',
                        mitigation: 'Definir senhas fortes para todos os usuários. Remover usuários anônimos. Executar mysql_secure_installation.',
                    },
                ],
            },
            // RDP - Port 3389
            {
                port: 3389,
                protocol: 'tcp',
                service: 'RDP',
                version: 'Microsoft Terminal Services',
                risk: SeverityLevel_1.SeverityLevel.CRITICAL,
                details: 'Remote Desktop Protocol — acesso remoto Windows',
                vulnerabilities: [
                    {
                        name: 'RDP Exposed to Internet',
                        description: 'RDP exposto é um dos vetores mais comuns de ransomware. Sujeito a brute force e exploits como BlueKeep.',
                        severity: SeverityLevel_1.SeverityLevel.CRITICAL,
                        category: 'Remote Access',
                        mitigation: 'Nunca expor RDP diretamente à internet. Usar VPN. Implementar NLA (Network Level Authentication). Aplicar patches.',
                        cveId: 'CVE-2019-0708',
                        reference: 'https://attack.mitre.org/techniques/T1021/001/',
                    },
                ],
            },
            // PostgreSQL - Port 5432
            {
                port: 5432,
                protocol: 'tcp',
                service: 'PostgreSQL',
                version: 'PostgreSQL 15.2',
                risk: SeverityLevel_1.SeverityLevel.HIGH,
                details: 'PostgreSQL Database Server',
                vulnerabilities: [
                    {
                        name: 'PostgreSQL Network Exposure',
                        description: 'Banco PostgreSQL acessível pela rede pode permitir ataques de brute force e acesso não autorizado a dados.',
                        severity: SeverityLevel_1.SeverityLevel.HIGH,
                        category: 'Access Control',
                        mitigation: 'Configurar listen_addresses=localhost. Usar pg_hba.conf para restringir acessos. Nunca expor à internet.',
                    },
                ],
            },
            // Redis - Port 6379
            {
                port: 6379,
                protocol: 'tcp',
                service: 'Redis',
                version: 'Redis 7.0.8',
                risk: SeverityLevel_1.SeverityLevel.CRITICAL,
                details: 'Redis Key-Value Store — frequentemente sem autenticação',
                vulnerabilities: [
                    {
                        name: 'Redis Without Authentication',
                        description: 'Redis por padrão não exige autenticação. Acesso não autorizado permite leitura/escrita de dados e execução de comandos.',
                        severity: SeverityLevel_1.SeverityLevel.CRITICAL,
                        category: 'Authentication',
                        mitigation: 'Configurar requirepass. Restringir bind para 127.0.0.1. Usar ACLs do Redis 6+. Nunca expor à internet.',
                        reference: 'https://attack.mitre.org/techniques/T1190/',
                    },
                ],
            },
            // MongoDB - Port 27017
            {
                port: 27017,
                protocol: 'tcp',
                service: 'MongoDB',
                version: 'MongoDB 6.0.4',
                risk: SeverityLevel_1.SeverityLevel.CRITICAL,
                details: 'MongoDB NoSQL Database',
                vulnerabilities: [
                    {
                        name: 'MongoDB Without Authentication',
                        description: 'MongoDB sem autenticação habilitada permite acesso total ao banco de dados, incluindo dump completo.',
                        severity: SeverityLevel_1.SeverityLevel.CRITICAL,
                        category: 'Authentication',
                        mitigation: 'Habilitar authorization no mongod.conf. Criar usuários com roles específicos. Restringir bindIp. Usar TLS.',
                    },
                ],
            },
            // DNS - Port 53
            {
                port: 53,
                protocol: 'udp',
                service: 'DNS',
                version: 'BIND 9.18.10',
                risk: SeverityLevel_1.SeverityLevel.MEDIUM,
                details: 'Domain Name System',
                vulnerabilities: [
                    {
                        name: 'DNS Zone Transfer',
                        description: 'Transferência de zona DNS (AXFR) pode expor toda a estrutura interna de domínios e subdomínios.',
                        severity: SeverityLevel_1.SeverityLevel.HIGH,
                        category: 'Information Disclosure',
                        mitigation: 'Restringir transferências de zona apenas para servidores DNS secundários autorizados (allow-transfer).',
                        reference: 'https://attack.mitre.org/techniques/T1590/002/',
                    },
                    {
                        name: 'DNS Cache Poisoning',
                        description: 'Servidores DNS recursivos podem ser envenenados para redirecionar tráfego para sites maliciosos.',
                        severity: SeverityLevel_1.SeverityLevel.MEDIUM,
                        category: 'Network Attack',
                        mitigation: 'Implementar DNSSEC. Desativar recursão para consultas externas se não necessário.',
                    },
                ],
            },
        ];
        this.quickPorts = [21, 22, 23, 25, 80, 443, 3306, 3389, 8080];
        this.fullPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 993, 995, 3306, 3389, 5432, 6379, 8080, 8443, 27017];
    }
    async scan(ip, scanMode) {
        const startedAt = new Date();
        const portsToScan = scanMode === 'full' ? this.fullPorts : this.quickPorts;
        // Simulate network latency
        await this.simulateDelay(scanMode === 'full' ? 2000 : 800);
        // Determine which ports are "open" based on IP address hash
        const openPorts = this.determineOpenPorts(ip, portsToScan);
        // Build port info and vulnerabilities from knowledge base
        const ports = [];
        const vulnerabilities = [];
        for (const port of openPorts) {
            const knowledge = this.knowledgeBase.find(k => k.port === port);
            if (knowledge) {
                ports.push(new PortInfo_1.PortInfo({
                    port: knowledge.port,
                    state: 'open',
                    protocol: knowledge.protocol,
                    service: knowledge.service,
                    version: knowledge.version,
                    risk: knowledge.risk,
                    details: knowledge.details,
                }));
                for (const vuln of knowledge.vulnerabilities) {
                    vulnerabilities.push(new Vulnerability_1.Vulnerability({
                        name: vuln.name,
                        description: vuln.description,
                        severity: vuln.severity,
                        category: vuln.category,
                        mitigation: vuln.mitigation,
                        cveId: vuln.cveId,
                        reference: vuln.reference,
                    }));
                }
            }
        }
        const summary = this.generateSummary(ip, ports, vulnerabilities);
        return new ScanResult_1.ScanResult({
            scanType: ScanType_1.ScanType.NETWORK,
            target: ip,
            startedAt,
            vulnerabilities,
            ports,
            summary,
        });
    }
    /**
     * Deterministically select "open" ports based on IP hash.
     * This creates consistent results for the same IP while varying across different IPs.
     */
    determineOpenPorts(ip, portsToScan) {
        const hash = this.hashIp(ip);
        const openPorts = [];
        // Common ports that are almost always "open" in a simulation
        const alwaysOpen = [80, 443];
        for (const p of alwaysOpen) {
            if (portsToScan.includes(p))
                openPorts.push(p);
        }
        // Use hash to determine additional open ports
        for (let i = 0; i < portsToScan.length; i++) {
            const port = portsToScan[i];
            if (openPorts.includes(port))
                continue;
            if ((hash + i * 7) % 3 === 0) {
                openPorts.push(port);
            }
        }
        return openPorts.sort((a, b) => a - b);
    }
    hashIp(ip) {
        let hash = 0;
        for (let i = 0; i < ip.length; i++) {
            const char = ip.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    generateSummary(ip, ports, vulnerabilities) {
        const critical = vulnerabilities.filter(v => v.severity.value === 'CRITICAL').length;
        const high = vulnerabilities.filter(v => v.severity.value === 'HIGH').length;
        let summary = `🔎 Análise NMPA do alvo ${ip}: ${ports.length} porta(s) aberta(s) identificada(s). `;
        summary += `${vulnerabilities.length} vulnerabilidade(s) encontrada(s)`;
        if (critical > 0 || high > 0) {
            summary += ` — ⚠ ATENÇÃO: ${critical} crítica(s), ${high} alta(s). Ação imediata recomendada.`;
        }
        else {
            summary += '.';
        }
        return summary;
    }
    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.NmapNetworkScanner = NmapNetworkScanner;
//# sourceMappingURL=NmapNetworkScanner.js.map
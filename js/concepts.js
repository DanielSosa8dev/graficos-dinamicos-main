// Implementación del Stack visual
class VisualStack {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.stack = [];
        this.blockHeight = 50;
        this.blockWidth = 140;
        this.startX = (this.canvas.width - this.blockWidth) / 2;
        this.startY = this.canvas.height - 60;
        this.maxStackSize = 6;
        this.animationSpeed = 5;
        this.isAnimating = false;
        
        this.drawBase();
        this.generateRandomExample();
    }
    
    drawBase() {
        // Fondo degradado
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#e9ecef');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Base del stack
        this.ctx.fillStyle = '#495057';
        this.ctx.beginPath();
        this.ctx.roundRect(this.startX - 15, this.startY + 15, this.blockWidth + 30, 15, [0, 0, 8, 8]);
        this.ctx.fill();
        
        // Poste del stack
        this.ctx.fillStyle = '#6c757d';
        this.ctx.fillRect(this.startX + this.blockWidth/2 - 7, this.startY - (this.blockHeight * this.maxStackSize) + 30, 14, (this.blockHeight * this.maxStackSize) + 30);
    }
    
    async push(value) {
        if (this.isAnimating) return false;
        if (this.stack.length >= this.maxStackSize) {
            return false;
        }
        
        this.isAnimating = true;
        const tempY = -50;
        const targetY = this.startY - (this.stack.length * this.blockHeight);
        
        // Dibujar bloque flotante
        this.ctx.fillStyle = this.getColorForPosition(this.stack.length);
        this.ctx.fillRect(this.startX, tempY, this.blockWidth, this.blockHeight);
        this.ctx.strokeStyle = '#343a40';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.startX, tempY, this.blockWidth, this.blockHeight);
        this.ctx.fillStyle = '#212529';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value, this.startX + this.blockWidth/2, tempY + this.blockHeight/2);
        
        // Animación de caída
        let currentY = tempY;
        while (currentY < targetY) {
            currentY += this.animationSpeed;
            this.drawStack();
            this.ctx.fillStyle = this.getColorForPosition(this.stack.length);
            this.ctx.fillRect(this.startX, currentY, this.blockWidth, this.blockHeight);
            this.ctx.strokeStyle = '#343a40';
            this.ctx.strokeRect(this.startX, currentY, this.blockWidth, this.blockHeight);
            this.ctx.fillStyle = '#212529';
            this.ctx.fillText(value, this.startX + this.blockWidth/2, currentY + this.blockHeight/2);
            await new Promise(r => requestAnimationFrame(r));
        }
        
        this.stack.push(value);
        this.drawStack();
        this.isAnimating = false;
        return true;
    }
    
    async pop() {
        if (this.isAnimating || this.stack.length === 0) {
            return null;
        }
        
        this.isAnimating = true;
        const value = this.stack[this.stack.length - 1];
        let currentY = this.startY - ((this.stack.length - 1) * this.blockHeight);
        const targetY = -this.blockHeight;
        
        // Animación de salida
        while (currentY > targetY) {
            currentY -= this.animationSpeed * 2;
            this.drawStack();
            this.ctx.fillStyle = this.getColorForPosition(this.stack.length - 1);
            this.ctx.fillRect(this.startX, currentY, this.blockWidth, this.blockHeight);
            this.ctx.strokeStyle = '#343a40';
            this.ctx.strokeRect(this.startX, currentY, this.blockWidth, this.blockHeight);
            this.ctx.fillStyle = '#212529';
            this.ctx.fillText(value, this.startX + this.blockWidth/2, currentY + this.blockHeight/2);
            await new Promise(r => requestAnimationFrame(r));
        }
        
        this.stack.pop();
        this.drawStack();
        this.isAnimating = false;
        return value;
    }
    
    peek() {
        if (this.stack.length === 0) {
            return null;
        }
        return this.stack[this.stack.length - 1];
    }
    
    isEmpty() {
        return this.stack.length === 0;
    }
    
    clear() {
        this.stack = [];
        this.drawStack();
    }
    
    drawStack() {
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Redibujar base y poste
        this.drawBase();
        
        // Dibujar cada elemento del stack
        for (let i = 0; i < this.stack.length; i++) {
            const yPos = this.startY - (i * this.blockHeight);
            
            // Sombra
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.beginPath();
            this.ctx.roundRect(this.startX + 5, yPos + 5, this.blockWidth, this.blockHeight, [4, 4, 0, 0]);
            this.ctx.fill();
            
            // Bloque principal
            this.ctx.fillStyle = this.getColorForPosition(i);
            this.ctx.beginPath();
            this.ctx.roundRect(this.startX, yPos, this.blockWidth, this.blockHeight, [4, 4, 0, 0]);
            this.ctx.fill();
            
            // Borde del bloque
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Texto del valor
            this.ctx.fillStyle = '#212529';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.stack[i], this.startX + this.blockWidth/2, yPos + this.blockHeight/2);
            
            // Resaltar el tope
            if (i === this.stack.length - 1) {
                this.ctx.strokeStyle = '#f72585';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.roundRect(this.startX - 3, yPos - 3, this.blockWidth + 6, this.blockHeight + 6, [8, 8, 0, 0]);
                this.ctx.stroke();
                
                // Etiqueta "Top"
                this.ctx.fillStyle = '#f72585';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.fillText('TOP', this.startX + this.blockWidth + 10, yPos + this.blockHeight/2);
            }
        }
    }
    
    getColorForPosition(pos) {
        const colors = [
            '#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff', '#4cc9f0'
        ];
        return colors[pos % colors.length];
    }
    
    async generateRandomExample() {
        this.clear();
        const exampleTypes = [
            'push', 'push', 'push', 'push_pop', 'push_pop_push', 'multiple_ops'
        ];
        const selectedExample = exampleTypes[Math.floor(Math.random() * exampleTypes.length)];
        const resultElement = document.getElementById('canvas-operation-result');
        
        switch(selectedExample) {
            case 'push':
                const pushCount = 3 + Math.floor(Math.random() * 3);
                for (let i = 0; i < pushCount; i++) {
                    await this.push(Math.floor(Math.random() * 90 + 10));
                    await this.delay(300);
                }
                resultElement.textContent = `Ejemplo: ${pushCount} operaciones Push consecutivas`;
                break;
                
            case 'push_pop':
                await this.push(50);
                await this.push(75);
                await this.delay(300);
                await this.pop();
                resultElement.textContent = 'Ejemplo: Push(50), Push(75), Pop() → 75';
                break;
                
            case 'push_pop_push':
                await this.push(30);
                await this.push(60);
                await this.delay(300);
                await this.pop();
                await this.delay(300);
                await this.push(90);
                resultElement.textContent = 'Ejemplo: Push(30), Push(60), Pop(), Push(90)';
                break;
                
            case 'multiple_ops':
                await this.push(10);
                await this.delay(200);
                await this.push(20);
                await this.delay(200);
                await this.push(30);
                await this.delay(300);
                await this.pop();
                await this.delay(300);
                await this.push(40);
                await this.delay(200);
                await this.pop();
                resultElement.textContent = 'Ejemplo: Push(10), Push(20), Push(30), Pop(), Push(40), Pop()';
                break;
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicialización y eventos
document.addEventListener("DOMContentLoaded", () => {
    const visualStack = new VisualStack('stack-canvas');
    const resultElement = document.getElementById('canvas-operation-result');
    
    // Eventos de los botones
    document.getElementById('canvas-push-btn').addEventListener('click', async () => {
        const value = document.getElementById('canvas-stack-value').value.trim();
        if (value) {
            if (await visualStack.push(value)) {
                resultElement.textContent = `Push(${value}) realizado`;
                resultElement.style.color = '#2b9348';
                document.getElementById('canvas-stack-value').value = '';
            } else {
                resultElement.textContent = '¡Stack lleno! Máximo 6 elementos';
                resultElement.style.color = '#f72585';
            }
        } else {
            resultElement.textContent = 'Ingresa un valor primero';
            resultElement.style.color = '#f72585';
        }
    });
    
    document.getElementById('canvas-pop-btn').addEventListener('click', async () => {
        const value = await visualStack.pop();
        if (value !== null) {
            resultElement.textContent = `Pop() → ${value}`;
            resultElement.style.color = '#4361ee';
        } else {
            resultElement.textContent = '¡Stack vacío! No hay elementos';
            resultElement.style.color = '#f72585';
        }
    });
    
    document.getElementById('canvas-peek-btn').addEventListener('click', () => {
        const value = visualStack.peek();
        if (value !== null) {
            resultElement.textContent = `Peek() → ${value}`;
            resultElement.style.color = '#4895ef';
        } else {
            resultElement.textContent = '¡Stack vacío! No hay elementos';
            resultElement.style.color = '#f72585';
        }
    });
    
    document.getElementById('canvas-clear-btn').addEventListener('click', () => {
        visualStack.clear();
        resultElement.textContent = 'Stack vaciado';
        resultElement.style.color = '#7209b7';
    });
    
    document.getElementById('canvas-random-btn').addEventListener('click', async () => {
        await visualStack.generateRandomExample();
    });
    
    // Manejo de tabs de código
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover clase active de todos los tabs y contenidos
            document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));
            
            // Agregar clase active al tab clickeado y su contenido correspondiente
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-code`).classList.add('active');
        });
    });
    
    // Manejar Enter en el input
    document.getElementById('canvas-stack-value').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('canvas-push-btn').click();
        }
    });
});
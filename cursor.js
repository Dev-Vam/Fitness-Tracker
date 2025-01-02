class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.opacity = '0';
        document.body.appendChild(this.cursor);

        this.cursorTrail = document.createElement('div');
        this.cursorTrail.className = 'cursor-trail';
        this.cursorTrail.style.opacity = '0';
        document.body.appendChild(this.cursorTrail);

        this.position = { x: 0, y: 0 };
        this.trailPosition = { x: 0, y: 0 };
        this.isMoving = false;
        this.timeout = null;

        this.bindEvents();
        this.render();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.position.x = e.clientX;
            this.position.y = e.clientY;
            this.isMoving = true;
            
            this.cursor.style.opacity = '1';
            this.cursorTrail.style.opacity = '1';
            
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.isMoving = false;
            }, 100);
        });

        const clickables = document.querySelectorAll('button, a, input, select');
        clickables.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorTrail.classList.add('hover');
            });
            elem.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorTrail.classList.remove('hover');
            });
        });
    }

    render() {
        const render = () => {
            this.cursor.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;

            this.trailPosition.x += (this.position.x - this.trailPosition.x) * 0.15;
            this.trailPosition.y += (this.position.y - this.trailPosition.y) * 0.15;
            this.cursorTrail.style.transform = `translate3d(${this.trailPosition.x}px, ${this.trailPosition.y}px, 0)`;

            if (this.isMoving) {
                this.cursor.classList.add('active');
                this.cursorTrail.classList.add('active');
            } else {
                this.cursor.classList.remove('active');
                this.cursorTrail.classList.remove('active');
            }

            requestAnimationFrame(render);
        };
        render();
    }
} 
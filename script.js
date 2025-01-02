class FitnessTracker {
    constructor() {
        this.workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        this.form = document.getElementById('workout-form');
        this.workoutList = document.getElementById('workouts');
        this.themeToggle = document.getElementById('theme-toggle');
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        this.displayWorkouts();
        this.updateStats();
        this.loadTheme();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const workout = {
            id: Date.now(),
            category: document.getElementById('category').value,
            exercise: document.getElementById('exercise').value,
            duration: parseInt(document.getElementById('duration').value),
            calories: parseInt(document.getElementById('calories').value),
            date: new Date().toLocaleDateString(),
            timestamp: new Date().getTime()
        };

        this.workouts.push(workout);
        this.saveToLocalStorage();
        this.displayWorkouts();
        this.updateStats();
        this.form.reset();
    }

    deleteWorkout(id) {
        this.workouts = this.workouts.filter(workout => workout.id !== id);
        this.saveToLocalStorage();
        this.displayWorkouts();
        this.updateStats();
    }

    saveToLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }

    getCategoryIcon(category) {
        const icons = {
            cardio: 'fa-running',
            strength: 'fa-dumbbell',
            yoga: 'fa-pray',
            hiit: 'fa-bolt',
            sports: 'fa-basketball-ball'
        };
        return icons[category] || 'fa-dumbbell';
    }

    displayWorkouts() {
        this.workoutList.innerHTML = this.workouts
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(workout => `
                <div class="workout-item">
                    <div class="workout-header">
                        <i class="fas ${this.getCategoryIcon(workout.category)}"></i>
                        <strong>${workout.exercise}</strong>
                    </div>
                    <div class="workout-meta">
                        <div><i class="fas fa-clock"></i> ${workout.duration} minutes</div>
                        <div><i class="fas fa-fire"></i> ${workout.calories} calories</div>
                        <div><i class="fas fa-calendar"></i> ${workout.date}</div>
                    </div>
                    <button 
                        onclick="fitnessTracker.deleteWorkout(${workout.id})"
                        class="delete-btn"
                    >
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `)
            .join('');
    }

    updateStats() {
        const totalCalories = this.workouts.reduce((sum, workout) => sum + workout.calories, 0);
        const totalDuration = this.workouts.reduce((sum, workout) => sum + workout.duration, 0);
        const totalWorkouts = this.workouts.length;

        document.getElementById('total-calories').textContent = totalCalories.toLocaleString();
        document.getElementById('total-duration').textContent = totalDuration.toLocaleString();
        document.getElementById('total-workouts').textContent = totalWorkouts;
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = this.themeToggle.querySelector('i');
        icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

const fitnessTracker = new FitnessTracker();
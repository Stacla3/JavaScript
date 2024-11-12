'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()+this.type.slice(1)} on ${months[this.date.getMonth()]}`;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class App {
    #map;
    #mapZoom = 13;
    #mapEv;
    #workout = [];
    constructor(){
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkOut.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }
    _getPosition(){
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
            alert(`Can't access your position.`);
        });
    }
    _loadMap(position){
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        this.#map = L.map('map').setView([latitude, longitude], this.#mapZoom);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this));
        this.#workout.forEach((w) => this._renderWorkoutMarker(w));
    }
    _showForm(mapEv){
        this.#mapEv = mapEv;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }
    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkOut(e){
        const validInput = (...input) => input.every(i => Number.isFinite(i))
        const isPositiveNumber = (...input) => input.every(i => i > 0);
        e.preventDefault();
        const type = inputType.value;
        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        const {lat, lng} = this.#mapEv.latlng;
        let workout;
        if(type === 'running'){
            const cadence = Number(inputCadence.value);
            if(!validInput(distance, duration, cadence) || !isPositiveNumber(distance, duration, cadence)) 
                return alert('Inputs have to be positive number.');
            workout = new Running([lat, lng], distance, duration, cadence);
        }
        if(type === 'cycling'){
            const elevation = Number(inputElevation.value);
            if(!validInput(distance, duration, elevation) || !isPositiveNumber(distance, duration)) 
                return alert('Inputs have to be positive number.');
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }
        this.#workout.push(workout);
        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);
        this._hideForm();
        this._setLocalStorage();
    }
    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️'+ workout.description : '🚴‍♀️' + workout.description}`)
        .openPopup();
    }
    _renderWorkout(workout){
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `
        if(workout.type === 'running')
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>`
        if(workout.type === 'cycling')
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__icon">⛰</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>`
        form.insertAdjacentHTML('afterend', html);
    }
    _moveToPopup(e){
        const workEl = e.target.closest('.workout');
        if(!workEl) return;
        const workout = this.#workout.find(work => work.id === workEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoom, {
            animate: true,
            pan: {
                duration: 1
            }
        });
    }
    _setLocalStorage(){
        //convert object to string
        localStorage.setItem('workouts', JSON.stringify(this.#workout));
    }
    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        if(!data) return;
        this.#workout = data;
        this.#workout.forEach((w) => this._renderWorkout(w));
    }
    reset(){
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();

export default class Timer {
    id;
    startTime;
    remainingTime;
    callback;
    duration;
    
    constructor(callback, duration, playAutomatically = true) {
        this.callback = callback;
        this.duration = duration;
        this.remainingTime = duration;
        
        if (playAutomatically)
            this.resume();
    }
    
    resume() {
        this.startTime = Date.now();
        
        clearTimeout(this.id);
        this.id = setTimeout(this.callback, this.remainingTime);
    }
    
    pause() {
        clearTimeout(this.id);
        this.remainingTime -= Date.now() - this.startTime;
    }
    
    end() {
        clearTimeout(this.id);
        this.callback();
    }
}
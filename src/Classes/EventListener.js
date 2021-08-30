export default class EventListener {
    listeners = {};
    options = {};
    
    subscribe(eventName, event, options) {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];
        
        if (~this.listeners[eventName].indexOf(event))
            return console.error(`Cannot subscribe to event "${eventName}"! Already subscribed.`, event);
        
        this.listeners[eventName].push(event);
        if (options)
            this.options[event] = options;
    }
    
    unsubscribe(eventName, event) {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];

        const index = this.listeners[eventName].indexOf(event);
        
        if (this.options[event])
            delete this.options[event];
        
        if (~index)
            this.listeners[eventName].splice(index, 1);
        else
            console.warn(`Cannot unsubscribe to event "${eventName}"! Not subscribed.`, event);
    }
    
    getOptionsFor(event) {
        return Object.assign({
            priority: 0
        }, this.options[event] || {});
    }
    
    invoke(eventName, ...args) {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];

        this.listeners[eventName].sort((a, b) => this.getOptionsFor(a).priority - this.getOptionsFor(b)).every(event => {
            try {
                if (event(...args) === true) {
                    return false;
                }
            }
            catch (e) {
                console.error(`Event listener failed to invoke "${eventName}"!`, event, e);
            }
            
            return true;
        });
    }
}
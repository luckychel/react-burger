
Array.prototype.random = function () {
    if (!this) return 
    return this[Math.floor((Math.random()*this.length))];
}

Array.prototype.shuffle = function() {
    if (!this) return 
    return this.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * (this.length) + 1));
}


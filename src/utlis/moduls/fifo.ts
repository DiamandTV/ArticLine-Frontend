export class FIFOQueue<T>{
    private readonly _size:number;
    private _queue:T[];

    constructor(size:number,array?:T[]){
        this._size = size;
        this._queue = [];
        if(array){
            this._queue = [...array]
        }
    }

    public get queue():T[]{
        return [...this._queue];
    }

    public get size():number{
        return this._size
    }

    public clone():FIFOQueue<T>{
        return new FIFOQueue(this.size,this.queue)
    }

    public dequeue(): T | undefined {
        return this._queue.shift(); // Rimuove e restituisce il primo elemento
    }

    private checkLength(){
        if(this._queue.length > this._size){
            const deleteCount = this._queue.length - this._size
            this._queue.splice(0,deleteCount)
        }
    }

    public addFIFO(item:T){
        this.checkLength()
        if(this._queue.length == this._size){
            this._queue.shift()
            this._queue.push(item)
        } 
        else {
            this._queue.push(item)
        }
    }


    public firstItem(): T | undefined{
        return this._queue[0] 
    }

    public lastItem(): T | undefined{
        return this._queue[this._queue.length-1]
    }

    public isEmpty(){
        return this._queue.length === 0
    }

    public isFull(){
        return this._queue.length === this._size
    }
}


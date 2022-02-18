public class Pair<T1,T2> {
    //seems familiar
    protected T1 fst;
    protected T2 snd;

    public Pair(T1 fst, T2 snd) {
        this.fst = fst;
        this.snd = snd;
    }

    public T1 fst() {
        return fst;
    }

    public T2 snd() {
        return snd;
    }

    public void setPair(T1 fst, T2 snd){
        this.fst = fst;
        this.snd = snd;
    }

    @Override
    public String toString() {
        return "(" + fst + ", " + snd + ")";
    }
}

function inverse(array, val = 0) {
    if (Math.abs(val) > array.length) {
        return 'Error'
    }

    if (val > 0) {
        let partToReverse = array.slice(val)
        let partToKeep = array.slice(0, val)

        return partToKeep.concat(partToReverse.reverse())
    } else if (val < 0) {
        let partToReverse = array.slice(0, array.length + val)
        let partToKeep = array.slice(val)

        return partToReverse.reverse().concat(partToKeep)
    }
    
    return array.reverse()
}

console.log(inverse([1, 2, 3, 4, 5, 6], -7));
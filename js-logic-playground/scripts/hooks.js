function useBuffer(i) {
    return i
}

function useNOT(i) {
    return !i
}

function useAND(i1, i2) {
    return i1 && i2
}

function useOR(i1, i2) {
    return i1 || i2
}

function useNAND(i1, i2) {
    return !(i1 && i2)
}

function useNOR(i1, i2) {
    return !(i1 || i2)
}

function useXOR(i1, i2) {
    return i1 !== i2
}

function useXNOR(i1, i2) {
    return i1 === i2
}

function useADDERHALF(i1, i2) {
    let sum = useXOR(i1, i2)
    let carry = useAND(i1, i2)
    return [sum, carry]
}

function useADDERFULL(input1, input2, carryIn) {
    /*
        input1 + input2 = sum1, carry1
        0 + 0 = sum1 0, carry1 0
        1 + 0 = sum1 1, carry1 0
        0 + 1 = sum1 1, carry1 0
        1 + 1 = sum1 0, carry1 1

        carryIn + sum1 = sum2, carry2
        0 + 0 = sum2 0, carry2 0
        1 + 0 = sum2 1, carry2 0
        0 + 1 = sum2 1, carry2 0
        1 + 1 = sum2 0, carry2 1

        carry3 = carry1 || carry2
    */
    let sum1 = useXOR(input1, input2);
    let carry1 = useAND(input1, input2);

    let sum2 = useXOR(carryIn, sum1)
    let carry2 = useAND(carryIn, sum1)

    let carry3 = useOR(carry1, carry2)

    return [sum2, carry3]
}

// const input = 1
// const input1 = 1
// // const output = useNOR(input, input)
// const output = useADDER(input, input1)
// // console.log(output)
// console.log(`sum: ${output[0]}`)
// console.log(`carry: ${output[1]}`)
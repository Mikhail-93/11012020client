import once from "../../src/models/decorators/once";

async function abs(x){
  return  Array.isArray(x)?x.map(eachItem=>Math.abs(eachItem)):Math.abs(x)
}

describe('once', () => {
  it('once call method with params',  async () => {
    let onceAbs = once(abs)
    expect(await onceAbs(-1)).toBe(1)
  })

  it('once called once',  async () => {
    let onceAbs = once(abs)
    expect( onceAbs(-1)).toBe(onceAbs(-1))
  })

  it('once called another after finish',  async () => {
    let onceAbs = once(abs)
    let result1= onceAbs(1)
    await result1
    expect( onceAbs(-1)).not.toBe(result1)
  })

  it('every once return same result',  async () => {
    let onceAbs = once(abs)
    let result = await Promise.all([onceAbs([-1]), onceAbs([-1])])

    expect( result[0]).toEqual([1])
    expect( result[0]).toBe(result[1])
  })

  it('every once get same error',  async () => {
    let onceAbs = once(async ()=>Promise.reject(new Error(123)))
    let result1 = onceAbs()
    let result2 = onceAbs()

    try{
      await result1
    }
    catch(er){
      result1=er
    }
    try{
      await result2
    }
    catch(er){
      result2=er
    }

    expect(result1).toBeInstanceOf(Error)
    expect(result1).toBe(result2)

  })
})
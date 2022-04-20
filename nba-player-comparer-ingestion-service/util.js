const getCurrentYear = () => {
    const today = new Date()
    const month = today.getMonth()
    const day = today.getDay()
    const currentYear = (month === 9 && day > 14) || today.getFullYear() > 9 ? today.getFullYear() - 1 : today.getFullYear()
    const nextYear = (currentYear + 1).toString().substring(2, 4)
    return `${currentYear}-${nextYear}`
}

module.exports = {
    getCurrentYear
}
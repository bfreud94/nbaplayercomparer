const getCurrentYear = () => {
    const today = new Date()
    const currentYear = parseInt(today.toISOString().split('-')[0]) - 1
    const nextYear = (currentYear + 1).toString().substring(2, 4)
    return `${currentYear}-${nextYear}`
}

module.exports = {
    getCurrentYear
}
const years = ['Select', 'FE', 'SE', 'TE', 'BE']
const branches = ['Select', 'Computer', 'IT', 'EXTC', 'Chemical', 'Bio-Medical', 'Bio-Technology']
const fe_divs = ['Select', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
const comps_divs = ['Select', 'C1', 'C2']
const it_divs_se = ['Select', 'S1', 'S2']
const it_divs_te = ['Select', 'T1', 'T2']
const it_divs_be = ['Select', 'B1', 'B2']


export const getYears = () => {
    return years
}

export const getBranches = () => {
    return branches
}

export const getDivs = (year, branch) => {

    if (year === 'FE') return fe_divs
    if (branch === 'Computer') return comps_divs
    if (branch === 'IT' && year === 'SE') return it_divs_se
    if (branch === 'IT' && year === 'TE') return it_divs_te
    if (branch === 'IT' && year === 'BE') return it_divs_be

    return null

}

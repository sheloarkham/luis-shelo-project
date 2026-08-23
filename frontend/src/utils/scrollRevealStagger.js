/** Delay escalonado para tarjetas en grid al hacer scroll */
export const scrollRevealStagger = (index, step = 0.07, cycle = 8) =>
  (index % cycle) * step

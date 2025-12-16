import { STATUS } from '../constants'

/**
 * Determines the status category based on age
 * @param {number} age - The age of the unicorn
 * @returns {Object} Status object with label, emoji, and CSS class
 */
export function getStatusByAge(age) {
  if (age >= STATUS.BABY.MIN_AGE && age <= STATUS.BABY.MAX_AGE) {
    return {
      label: STATUS.BABY.LABEL,
      emoji: STATUS.BABY.EMOJI,
      class: STATUS.BABY.CLASS,
    }
  }
  
  if (age >= STATUS.MATURE.MIN_AGE && age <= STATUS.MATURE.MAX_AGE) {
    return {
      label: STATUS.MATURE.LABEL,
      emoji: STATUS.MATURE.EMOJI,
      class: STATUS.MATURE.CLASS,
    }
  }
  
  return {
    label: STATUS.OLD.LABEL,
    emoji: STATUS.OLD.EMOJI,
    class: STATUS.OLD.CLASS,
  }
}


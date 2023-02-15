from ast import expr
import re
from collections import Counter

def check_count(digits, string1, string2):
    
    digitsCounter= Counter(digits)
    stringCounter = Counter(string1 + string2)
    commonKeys = set(digitsCounter.keys()) & set(stringCounter.keys())
    for key in commonKeys:
        if stringCounter[key] > digitsCounter[key]:
            return False
    return True

    

def compute25(digits):
    
    expRestantes = list(digits)
    
    expResultantes = list(digits)
    
    
    found = []
    
    while not bool(found) and bool(expRestantes):
        actual = expRestantes.pop(0)
        for element in expResultantes:
            if check_count(list(digits), actual, element): 
                expresiones = {
                    f"({actual}+{element})",
                    f"({actual}-{element})",
                    f"({actual}*{element})",
                    f"({actual}/{element})",
                    f"({element}-{actual})"
                }

                expresiones = [ele for ele in expresiones if eval(ele) > 0]
                found = [ele for ele in expresiones if (eval(ele) == 25 and len(re.sub("[()+*/-]","",ele)) == 4)]
                for expresion in expresiones:
                    if expresion not in expResultantes:
                        expRestantes.append(expresion)
                        expResultantes.append(expresion)
    return found[0] if found else ("SIN SOLUCIÓN")





print(compute25("6153"))
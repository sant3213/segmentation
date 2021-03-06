#! /usr/bin/env python

import sys
from optparse import OptionParser
import random
import math
from data import Data
from data import Addressess
from data import Base0
from data import Base1
# to make Python2 and Python3 act the same -- how dumb

def exec_segmentation(res):
    result = Data()
    base0Object = Data()
    base1Object = Data()
    addressTrace = Addressess()
    addressTraceList =[]
    def random_seed(seed):
        try:
            random.seed(seed, version=1)
        except:
            random.seed(seed)
        return

    def convert(size):
        length = len(size)
        lastchar = size[length-1]
        if (lastchar == 'k') or (lastchar == 'K'):
            m = 1024
            nsize = int(size[0:length-1]) * m
        elif (lastchar == 'm') or (lastchar == 'M'):
            m = 1024*1024
            nsize = int(size[0:length-1]) * m
        elif (lastchar == 'g') or (lastchar == 'G'):
            m = 1024*1024*1024
            nsize = int(size[0:length-1]) * m
        else:
            nsize = int(size)
        return nsize

    def abort_if(condition, message):
        if condition:
            result.error= message
            print('Error:', message)
           # exit(1)
        return

    random_seed(res.get('seed'))
    
    asize = convert(res.get('asize'))
    psize = convert(res.get('psize'))
    '''
    asize = convert("1k")
    psize = convert("16k")
    '''
    addresses = str("-1")
   #print('ARG seed', 0)
    #print('ARG address space size', asize)
    #print('ARG phys mem size', psize)
    #print('')


    abort_if(psize <= 4, 'Debe especificar un tamaño de memoria física mas grande')
    abort_if(asize == 0, 'Debe especificar un tamaño de espacio de direccionamiento distinto de cero')
    abort_if(psize <= asize, 'El tamaño de memoria física es mayor al tamaño de espacio de direccionamiento')

    #
    # need to generate base, bounds for segment registers
    #

    if res.get('asize') != None:
        print(res.get('asize'))
    
    len0 = convert(res.get('len0'))
    len1 = convert(res.get('len1'))
    base0 = convert(res.get('base0'))
    base1 = convert(res.get('base1'))
    addresses = res.get('address')

    '''
    len0 = convert("-1")
    len1 = convert("-1")
    base0 = convert("-1")
    base1 = convert("-1")
'''
    # if randomly generating length, make it 1/4-1/2 the address space size (roughly)
    if len0 == -1:
        len0 = int(asize/4.0 + (asize/4.0 * random.random()))
    if len1 == -1:
        len1 = int(asize/4.0 + (asize/4.0 * random.random()))

    if base0 == -1 or base1 == -1:
        # this restriction just makes it easier to place randomly-placed segments
        abort_if(psize <= 2 * asize, 'La memoria física debe ser 2x más grande que el tamaño del espacio de direccionamiento (Si genera registros base aleatoriamente)')

    # if randomly generate base, have to find room for them
    if base0 == -1:
        done = 0
        while done == 0:
            base0 = int(psize * random.random())
            if (base0 + len0) < psize:
                done = 1

    # internally, base1 points to the lower address, and base1+len1 the higher address
    # (this differs from what the user would pass in)
    if base1 == -1:
        done = 0
        while done == 0:
            base1 = int(psize * random.random())
            if (base1 + len1) < psize:
                if (base1 > (base0 + len0)) or ((base1 + len1) < base0):
                    done = 1
    else:
        base1 = base1 - len1

    abort_if(psize < base0 + len0 - 1, 'Segmento 0 no está en la memoria física')
    abort_if(psize < base1, 'Segmento 1 no está en la memoria física')
        
    abort_if(len0 > asize/2.0, 'El registro del tamaño de dirección virtual del segmento 0 es muy grande para este espacio de direccionamiento')
    abort_if(len1 > asize/2.0, 'El registro del tamaño de dirección virtual del segmento 1 es muy grande para este espacio de direccionamiento')

    print('Segment register information:')
    print('')
    base0Object.hexa='0x%08x' % (base0)
    base0Object.decimal='%d' % (base0)
    base0Object.isPositive='1'
    print('  Segment 0 base  (grows positive) : 0x%08x (decimal %d)' % (base0, base0))
    result.len0='%d' % (len0)
    result.len0Hexa='0x%08x' % (len0)
    print('  Segment 0 limit                  : %d and hexa: 0x%08x' % (len0, len0))
    print('')
    base1Object.hexa='0x%08x' % (base1+len1)
    base1Object.decimal='%d' % (base1+len1)
    base1Object.isPositive='0'
    print('  Segment 1 base  (grows negative) : 0x%08x (decimal %d)' % (base1+len1, base1+len1))
    result.len1='%d' % (len1)
    result.len1Hexa='0x%08x' % (len1)
    print('  Segment 1 limit                  : %d' % (len1))
    print('')

    nbase1 = base1 + len1

    abort_if((len0 + base0) > base1 and (base1 > base0), 'los segmentos se superponen en la memoria física')

    addrList = []
    if addresses == '-1':
        # need to generate addresses
        for i in range(0, res.get('numaddrs')): # Agregar num como numaddrs representada como -n como parámetro defecto 5 
            n = int(asize * random.random())
            addrList.append(n)
    else:
        addrList = addresses.split(',')

    #
    # now, need to generate virtual address trace
    #
    print('Virtual Address Trace')
    i = 0
    for vstr in addrList:
        vaddr = int(vstr)
        if vaddr < 0 or vaddr >= asize:
            result.error = 'La dirección virtual %d no puede ser generada en un espacio de direccionamiento de tamaño %d' % (vaddr, asize) 
            print('Error: virtual address %d cannot be generated in an address space of size %d' % (vaddr, asize))
        if True == False: # Agregar solve parámetro "-c"
            print('  VA %2d: 0x%08x (decimal: %4d) --> PA or segmentation violation?' % (i, vaddr, vaddr))
        else:
            paddr = 0
            if (vaddr >= (asize / 2)):
                # seg 1
                #  [base1+len1]  [negative offset]
                paddr = nbase1 + (vaddr - asize)
                if paddr < base1:
                    addressTrace.hexa= '0x%08x' % (vaddr)
                    addressTrace.decimal= '%4d' % (vaddr)
                    addressTrace.hexaValid = 'VIOLACIÓN EN SEGMENTO 1'
                    addressTrace.decimalValid = 'VIOLACIÓN EN SEGMENTO 1'
                    addressTrace.segment = 'Segmento 1'
                    addressTraceList.append(addressTrace)
                    addressTrace = Addressess()
                    print('  VA %2d: 0x%08x (decimal: %4d) --> SEGMENTATION VIOLATION (SEG1)' % (i, vaddr, vaddr))
                else:
                   # addressTrace.append('  VA %2d: 0x%08x (decimal: %4d) --> VALID in SEG1: 0x%08x (decimal: %4d)' % (i, vaddr, vaddr, paddr, paddr))
                    addressTrace.hexa = '0x%08x' % (vaddr)
                    addressTrace.decimal = '%4d' % (vaddr)
                    addressTrace.hexaValid = '0x%08x'% (paddr)
                    addressTrace.decimalValid = '%4d'% (paddr)
                    addressTrace.segment = 'Segmento 1'
                    addressTraceList.append(addressTrace)
                    addressTrace = Addressess()
                    print('  VA %2d: 0x%08x (decimal: %4d) --> VALID in SEG1: 0x%08x (decimal: %4d)' % (i, vaddr, vaddr, paddr, paddr))
            else:
                # seg 0
                if (vaddr >= len0):
                   # addressTrace.append('  VA %2d: 0x%08x (decimal: %4d) --> SEGMENTATION VIOLATION (SEG0)' % (i, vaddr, vaddr))
                    addressTrace.hexa= '0x%08x' % (vaddr)
                    addressTrace.decimal= '%4d' % (vaddr)
                    addressTrace.hexaValid = 'VIOLACIÓN EN SEGMENTO 0'
                    addressTrace.decimalValid = 'VIOLACIÓN EN SEGMENTO 0'
                    addressTrace.segment = 'Segmento 0'
                    addressTraceList.append(addressTrace)
                    addressTrace = Addressess()
                    print('  VA %2d: 0x%08x (decimal: %4d) --> SEGMENTATION VIOLATION (SEG0)' % (i, vaddr, vaddr))
                else:
                    paddr = vaddr + base0
                    addressTrace.hexa = '0x%08x' % (vaddr)
                    addressTrace.decimal = '%4d' % (vaddr)
                    addressTrace.hexaValid = '0x%08x '% (paddr)
                    addressTrace.decimalValid = '%4d'% (paddr)
                    addressTrace.segment = 'Segmento 1'
                    addressTraceList.append(addressTrace)
                    addressTrace = Addressess()
                    print('  VA %2d: 0x%08x (decimal: %4d) --> VALID in SEG0: 0x%08x (decimal: %4d)' % (i, vaddr, vaddr, paddr, paddr))
        i += 1

    if False == False: # Agregar solve parámetro "-c"
      '''  print('For each virtual address, either write down the physical address it translates to')
        print('OR write down that it is an out-of-bounds address (a segmentation violation). For')
        print('this problem, you should assume a simple address space with two segments: the top')
        print('bit of the virtual address can thus be used to check whether the virtual address')
        print('is in segment 0 (topbit=0) or segment 1 (topbit=1). Note that the base/limit pairs')
        print('given to you grow in different directions, depending on the segment, i.e., segment 0')
        print('grows in the positive direction, whereas segment 1 in the negative. ')
        print('')'''
    result.base0 = base0Object
    result.base1 = base1Object
    result.virtualAddressTrace = addressTraceList
    return result   


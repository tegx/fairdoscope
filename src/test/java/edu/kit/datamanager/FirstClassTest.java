/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.kit.datamanager;

import org.junit.Assert;
import org.junit.Test;

/**
 *
 * @author 
 */
public class FirstClassTest {

    @Test
    public void testTrue() {
        FirstClass instance = new FirstClass();
        Assert.assertTrue(instance.testMe(true));
    }

    @Test
    public void testFalse() {
        FirstClass instance = new FirstClass();
        Assert.assertFalse(instance.testMe(false));
    }
}

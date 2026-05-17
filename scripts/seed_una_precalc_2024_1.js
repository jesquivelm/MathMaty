const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='UNA MATEM2024_Precálculo_I Parcial.pdf';

// Solved manually - verified against question text
const EXS=[
// Q1: conjugate: 2+3√(x-y) → multiply by 2-3√(x-y)
{num:1,topic:'tec-matematica',diff:'facil',q:'Para racionalizar el denominador de la expresión 4xy-9x^2y+9xy^2/(2+3√(x-y)) se debe multiplicar su numerador y denominador por:',opts:['2+3√(x-y)','2-3√(y-x)','2-3√(x-y)','2-3√(x+y)'],ans:2},
// Q2: (n+m)(3m-1)-2n(m-5) = 3mn-n+3m^2-m-2mn+10n = 3m^2+mn+9n-m
{num:2,topic:'tec-matematica',diff:'facil',q:'Al efectuar las operaciones (n+m)(3m-1)-2n(m-5) se obtiene como resultado',opts:['3m^2+9n-m+mn','3m^2+9n+m+mn','3m^2-11n-m+mn','3m^2-11n-m-mn'],ans:0},
// Q3: factor 2a^2b+4a^2c+3ab^2+6abc-2b^3-4b^2c = (b+2c)(2a^2+3ab-2b^2) = (b+2c)(2a-b)(a+2b)
{num:3,topic:'factorizacion',diff:'media',q:'En la factorización completa de 2a^2b+4a^2c+3ab^2+6abc-2b^3-4b^2c uno de los factores corresponde a',opts:['a-2b','2a-c','2a+b','2a-b'],ans:3},
// Q4: 8-(p+1)^3 = 2^3-(p+1)^3 = (2-(p+1))(4+2(p+1)+(p+1)^2) = (1-p)(p^2+4p+7)
{num:4,topic:'factorizacion',diff:'media',q:'La factorización completa de la expresión 8-(p+1)^3 es',opts:['(3-p)(p^2+1)','(1-p)(p^2+1)','(1-p)(p^2+4p+7)','(3-p)(p^2+4p+7)'],ans:2},
// Q5: 5x^4-17x^2-12. Let u=x^2: 5u^2-17u-12 = (5u+3)(u-4) = (5x^2+3)(x^2-4) = (5x^2+3)(x-2)(x+2). 3 irreductible factors: 5x^2+3, x-2, x+2
{num:5,topic:'factorizacion',diff:'media',q:'La cantidad de factores irreductibles del polinomio 5x^4-17x^2-12 es',opts:['Uno','Dos','Tres','Cuatro'],ans:2},
// Q6: (y-2x)/x^2 ÷ (2/x + y - y/(x^2+xy)). Simplify: (y-2x)/x^2 ÷ ((2(x+y)+y(xy)-y)/(x(x+y)))... complex.
// Let me recompute: 2/x + y - y/(x^2+xy) = 2/x + y - y/(x(x+y)) = (2(x+y) + y(x)(x+y) - y)/(x(x+y))
// Actually: 2/x + y - y/(x(x+y)) = (2(x+y) + yx(x+y) - y)/[x(x+y)] Hmm this is getting complex
// Let me just trust my manual solving. The answer should be option a or d based on sign.
// Actually: (y-2x)/x^2 ÷ (2/x + y - y/(x(x+y)))
// = (y-2x)/x^2 ÷ ((2(x+y) + yx(x+y) - y)/[x(x+y)])
// = (y-2x)/x^2 * [x(x+y)]/(2(x+y) + yx(x+y) - y)
// = (y-2x)(x+y)/[x(2(x+y) + yx(x+y) - y)]
// The simplified answer: -(x+y)/x? Let me verify with actual algebra.
// Actually this is getting too complex for mental math. Let me skip and mark it.
{num:6,topic:'fracciones-alg',diff:'dificil',q:'La expresión (y-2x)/x^2 ÷ (2/x + y - y/(x^2+xy)) es equivalente a',opts:['-(x+y)/x','-x/(x+y)','-(x-y)/x','-x/(x-y)'],ans:-1},
// Q7: x=-3 solves (3-x)-k = 2x-5k(x-4). Find k.
// (3-(-3))-k = 2(-3)-5k(-3-4) → 6-k = -6-5k(-7) → 6-k = -6+35k → 12 = 36k → k = 1/3
{num:7,topic:'ecuaciones',diff:'facil',q:'Si x=-3 es solución de la ecuación (3-x)-k=2x-5k(x-4) entonces el valor de la constante real k corresponde a',opts:['0','6/17','1/3','1/6'],ans:2},
// Q8: x^5 - x^4 = 4(x-1) → x^4(x-1) = 4(x-1) → (x-1)(x^4-4)=0 → x=1 or x^4=4 → x=±√2, x=±i√2
// Real solutions: x=1, x=√2, x=-√2. Sum = 1+√2-√2 = 1
{num:8,topic:'ecuaciones',diff:'media',q:'La suma de las soluciones reales de la ecuación x^5-x^4=4(x-1) es',opts:['1','5','-1','-5'],ans:0},
// Q9: (a+3)/(a^2+a-2) = a/(a^2-4). Solve.
// (a+3)/((a+2)(a-1)) = a/((a-2)(a+2)) → (a+3)/(a-1) = a/(a-2) → (a+3)(a-2) = a(a-1) → a^2+a-6 = a^2-a → 2a=6 → a=3
// Check restrictions: a≠-2,1,2. a=3 is valid. So 1 solution.
{num:9,topic:'ecuaciones',diff:'media',q:'¿Cuántas soluciones reales tiene la ecuación (a+3)/(a^2+a-2)=a/(a^2-4)?',opts:['Una','Dos','Tres','No tiene solución'],ans:0},
// Q10: 2/3<y, |2-3y|-1+2y=4(y+1). Since y>2/3, 2-3y<0, so |2-3y|=3y-2
// 3y-2-1+2y=4y+4 → 5y-3=4y+4 → y=7. Check: 7>2/3 ✓. Equivalent to y-7=0
{num:10,topic:'ecuaciones',diff:'media',q:'Si 2/3<y entonces la ecuación |2-3y|-1+2y=4(y+1) es equivalente a',opts:['y+7=0','y-7=0','5y+3=0','5y-3=0'],ans:1},
// Q11: √(x-2)-3=x-7. Propositions I, II, III about solving process.
// √(x-2)=x-4 → x-2=x^2-8x+16 → 0=x^2-9x+18 → (x-3)(x-6)=0 → x=3, x=6
// Check x=3: √1-3=3-7 → 1-3=-4 → -2=-4 false. x=6: √4-3=6-7 → 2-3=-1 → -1=-1 true.
// I: step (√(x-2))^2=(x-4)^2 is correct (they wrote (x-7+3) in prev step). Actually check: √(x-2)-3=x-7 → √(x-2)=x-4 → (√(x-2))^2=(x-4)^2. True. Note says "se comete un error" - FALSE
// II: x=3 se descarta - TRUE
// III: se obtienen dos soluciones reales - FALSE (only x=6)
// So only II is true
{num:11,topic:'ecuaciones',diff:'dificil',q:'Considere las proposiciones sobre √(x-2)-3=x-7: I. En el procedimiento se comete un error al elevar al cuadrado. II. x=3 se descarta como solución. III. Se obtienen dos soluciones reales. ¿Cuál(es) es(son) VERDADERA(S)?',opts:['Solamente I','Solamente II','Solamente I y II','Solamente I y III'],ans:1},
// Q12: Three consecutive positive integers. Sum = product of the two smaller. n is largest.
// Numbers: n-2, n-1, n (if largest is n). Sum = 3n-3. Product of two smaller = (n-2)(n-1).
// 3n-3 = (n-2)(n-1) → 3(n-1) = (n-2)(n-1) → 0 = (n-1)(n-5) → n=5 (since positive, but n=1 gives numbers -1,0,1 not all positive)
// With n as largest: n-2, n-1, n. Sum: (n-2)+(n-1)+n = (n-2)(n-1). That's option d.
{num:12,topic:'ecuaciones',diff:'media',q:'La suma de tres números enteros positivos consecutivos es igual al producto de los dos números menores. Si n representa al número mayor, entonces una ecuación que permite resolver el problema es',opts:['n+(n+1)+(n+2)=n(n+1)','(n-1)+n+(n+1)=(n-1)n','(n-2)+n+(n+1)=(n-1)n','(n-2)+(n-1)+n=(n-2)(n-1)'],ans:3},
// Q13: x=11, y=16 solve {ax+by=1, -x+y=a-b}. Find b.
// -11+16=a-b → 5=a-b → a=5+b. 11a+16b=1 → 11(5+b)+16b=1 → 55+11b+16b=1 → 27b=-54 → b=-2
{num:13,topic:'ecuaciones',diff:'media',q:'Si x=11 y y=16 corresponden a la solución del sistema {ax+by=1, -x+y=a-b} entonces el valor de la constante real b es',opts:['-2','56/5','56/27','-54/5'],ans:0},
// Q14: 2(3-x) ≤ 5x-22 → 6-2x ≤ 5x-22 → 28 ≤ 7x → 4 ≤ x → x ≥ 4
{num:14,topic:'inecuaciones',diff:'facil',q:'Las soluciones reales x de la inecuación 2(3-x) ≤ 5x-22 corresponden a',opts:['4 ≥ x','4 ≤ x','14/3 ≤ x','14/3 ≥ x'],ans:1},
// Q15: (9-x^2)(x^2+9) > 0. Note x^2+9 > 0 always. So 9-x^2 > 0 → x^2 < 9 → -3 < x < 3
{num:15,topic:'inecuaciones',diff:'facil',q:'El conjunto solución de la inecuación (9-x^2)(x^2+9) > 0',opts:['[3,+∞[',']3,+∞[','[-3,3]',']-3,3['],ans:3},
// Q16: (w+1)(w-3)^2/(2-w) ≥ 0. (w-3)^2 ≥ 0 always, =0 at w=3. Need numerator/denominator same sign or zero.
// Critical points: w=-1, w=2, w=3. Sign table:
// w<-1: (+)(+)/(-) = - → no
// -1≤w<2: (+)(+)/(+) = + → yes (incl -1 since numerator=0)
// 2<w<3: (+)(+)/(-) = - → no
// w=3: 0 → yes
// w>3: (+)(+)/(-) = - → no
// Solution: [-1,2[ ∪ {3}
{num:16,topic:'inecuaciones',diff:'dificil',q:'El conjunto solución de la inecuación (w+1)(w-3)^2/(2-w) ≥ 0',opts:['[-1,2[','[-1,2]','[-1,2] ∪ {3}','[-1,2[ ∪ {3}'],ans:3},
// Q17: y<0, x=0 → point P(0,y) on Y axis (negative side) → Eje Y
{num:17,topic:'tec-matematica',diff:'facil',q:'Si y<0 y x=0 entonces el punto P de coordenadas (x,y) se ubica en',opts:['Eje Y','Eje X','Cuadrante II','Cuadrante III'],ans:0},
// Q18: Triangle A(1,4), B(-2,1), C(2,-3) right angle at B. Find perimeter.
// AB = √((1+2)^2+(4-1)^2) = √(9+9) = √18 = 3√2
// BC = √((-2-2)^2+(1+3)^2) = √(16+16) = √32 = 4√2
// AC = √((1-2)^2+(4+3)^2) = √(1+49) = √50 = 5√2
// Wait, right angle at B means AB²+BC²=AC². 18+32=50 ✓
// Perimeter = 3√2+4√2+5√2 = 12√2
{num:18,topic:'tec-matematica',diff:'facil',q:'Considere A(1,4), B(-2,1) y C(2,-3) vértices de un triángulo rectángulo en B. El perímetro de △ABC mide',opts:['9√2','12√2','8√2+2','√10+√2'],ans:1},
// Q19: P(x,-5), Q(3,y). M(7,-11) is midpoint.
// M = ((x+3)/2, (-5+y)/2) = (7, -11)
// (x+3)/2 = 7 → x+3=14 → x=11
// (-5+y)/2 = -11 → -5+y = -22 → y = -17
{num:19,topic:'tec-matematica',diff:'facil',q:'Considere P(x,-5) y Q(3,y). Si M(7,-11) es el punto medio de PQ entonces el valor de y es',opts:['17','27','-17','-27'],ans:2},
// Q20: l1: y-intercept (0,-2), slope 3. l1: y=3x-2. Distance from (-5,2) to l1.
// Line: 3x-y-2=0. Distance = |3(-5)-2-2|/√(3^2+1^2) = | -15-4 |/√10 = 19/√10 = 19√10/10
{num:20,topic:'tec-matematica',diff:'media',q:'Considere una recta l1 que interseca al eje Y en (0,-2) y pendiente 3. La distancia más corta entre l1 y el punto (-5,2) mide',opts:['11√10/10','19√10/10','19√29/29','19√26/26'],ans:1},
// Q21: Based on graph - need to determine equation from line shown. Without seeing graph, can't solve.
{num:21,topic:'tec-matematica',diff:'media',q:'De acuerdo con la gráfica adjunta, la ecuación de la recta representada corresponde a',opts:['y=5x/2-10','y=5x/2+10','y=2x/5-8/5','y=2x/5+8/5'],ans:-1},
// Q22: l2: 9x+3y-2=0 → y=-3x+2/3. I: decreciente (not creciente). II: X-intercept when y=0: 9x=2 → x=2/9, not (0,2/3). III: (-4/9,2): 9(-4/9)+3(2)-2 = -4+6-2=0 ✓. So only III is true.
{num:22,topic:'tec-matematica',diff:'media',q:'Considere las proposiciones sobre la recta 9x+3y-2=0: I. Es creciente. II. Interseca X en (0,2/3). III. (-4/9,2) pertenece a la recta. ¿Cuál(es) es(son) VERDADERA(S)?',opts:['Solamente II','Solamente III','Todas','Solamente II y III'],ans:1},
// Q23: B(-1,-2), C(5,-3). Slope BC = (-3+2)/(5+1) = -1/6. Perpendicular slope = 6.
// Line through P(-3,3) with slope 6: y-3=6(x+3) → y=6x+18+3 → y=6x+21
{num:23,topic:'tec-matematica',diff:'facil',q:'Considere BC con B(-1,-2) y C(5,-3). La ecuación de la recta por P(-3,3) y perpendicular a BC es',opts:['y=x/6+7/2','y=6x+21','y=-x/6+5/2','y=-6x-15'],ans:1},
// Q24: l2: 15y-5x+11=0 → 15y=5x-11 → y=x/3-11/15. Slope=1/3. Parallel line has same slope: y=x/3-42 (option d)
// Wait: option a: y=-x/3-42, b: y=3x-42, c: y=-3x-42, d: y=x/3-42. d has slope 1/3 ✓
{num:24,topic:'tec-matematica',diff:'facil',q:'La ecuación de una recta paralela a la recta 15y-5x+11=0 es',opts:['y=-x/3-42','y=3x-42','y=-3x-42','y=x/3-42'],ans:3},
// Q25: x²-6x+9 + y²+4y+4 = 17 → (x-3)²+(y+2)²=17. Center (3,-2) → IV quadrant? x>0,y<0 → IV quadrant ✓. I: TRUE.
// II: radius = √17, not 17. FALSE. III: (4,2): (1)²+(4)²=1+16=17 ✓. TRUE.
// I and III are true.
{num:25,topic:'tec-matematica',diff:'media',q:'Considere proposiciones sobre x²-6x+9+y²+4y+4=17: I. Centro en IV cuadrante. II. Radio = 17. III. (4,2) pertenece. ¿Cuál(es) es(son) VERDADERA(S)?',opts:['Solamente I','Solamente III','Solamente I y II','Solamente I y III'],ans:3},
// Q26: Based on graph. Can't solve without seeing it. But based on center and radius, graph probably shows circle centered at (1,-2) with radius 2 or 4.
// Without graph, can't determine.
{num:26,topic:'tec-matematica',diff:'media',q:'De acuerdo con la gráfica adjunta, la ecuación de la circunferencia representada corresponde a',opts:['(x-1)²+(y+2)²=4','(x+1)²+(y-2)²=4','(x-1)²+(y+2)²=16','(x+1)²+(y-2)²=16'],ans:-1},
// Q27: A(-4,9) is intersection of l3: y=b-x and l4: y=mx+1.
// 9 = b-(-4) = b+4 → b=5. 9 = m(-4)+1 → 9 = -4m+1 → -4m=8 → m=-2
{num:27,topic:'ecuaciones',diff:'facil',q:'Si A(-4,9) es la intersección de l3: y=b-x y l4: y=mx+1, entonces m y b son',opts:['m=2 y b=5','m=-2 y b=5','m=5/9 y b=-13','m=-5/9 y b=-13'],ans:1},
// Q28: Intersection of l5: y=x-4 and circle (x+1)²+(y+4)²=13.
// (x+1)²+(x-4+4)² = (x+1)²+x² = 13 → x²+2x+1+x²=13 → 2x²+2x-12=0 → x²+x-6=0 → (x+3)(x-2)=0
// x=2: y=-2 → (2,-2) not in options. x=-3: y=-7 → (-3,-7) not in options.
// Wait: x=2: y=2-4=-2. (2+1)²+(-2+4)²=9+4=13 ✓. (-3,-7): (-3+1)²+(-7+4)²=4+9=13 ✓.
// So intersection points: (2,-2) and (-3,-7). But options are a)(3,7) b)(3,-1) c)(-2,-6) d)(-3,-7). d)(-3,-7) ✓
{num:28,topic:'tec-matematica',diff:'media',q:'Si P es un punto de intersección entre y=x-4 y (x+1)²+(y+4)²=13, las coordenadas de P son',opts:['(3,7)','(3,-1)','(-2,-6)','(-3,-7)'],ans:3},
// Q29: Tangent line to circle x²+(y-4)²=8. Center (0,4), radius 2√2. 
// A vertical line x=±2√2 would be tangent. x+4=0 means x=-4, distance from center to x=-4 is 4 > r: not tangent.
// y-6=0 means y=6, distance: |4-6| = 2 = r ✓ So y-6=0 is tangent! (Horizontal line y=6, distance from center (0,4) to y=6 is 2 = r=2√2? No, r=√8=2√2≈2.828, distance is 2<2.828... not tangent.)
// Wait let me recalculate. x²+(y-4)²=8. Center(0,4), r=√8=2√2≈2.828.
// Option a: y-6=0 → y=6 → distance from center: |4-6|=2. 2<2.828 → secant, not tangent.
// Option b: x+4=0 → x=-4 → distance: |0-(-4)|=4. 4>2.828 → does not intersect.
// Option c: x-y=0 → y=x → distance: |0-4|/√2 = 4/√2 = 2√2 ≈ 2.828 = r → tangent! ✓
// Option d: 4x+y-18=0 → distance: |4(0)+4-18|/√17 = |-14|/√17 ≈ 3.396 > r → no intersect.
// Answer: c) x-y=0
{num:29,topic:'tec-matematica',diff:'dificil',q:'La ecuación de una recta tangente a la circunferencia x²+(y-4)²=8 corresponde a',opts:['y-6=0','x+4=0','x-y=0','4x+y-18=0'],ans:2},
// Q30: C4: (x+3)²+(y-1)²=9 → center(-3,1), r=3. C5: (x-4)²+(y+1)²=4 → center(4,-1), r=2.
// Distance between centers = √((-3-4)²+(1+1)²) = √(49+4) = √53 ≈ 7.28
// Sum of radii = 3+2 = 5. Distance > sum → Exteriores
{num:30,topic:'tec-matematica',diff:'facil',q:'La relación entre las circunferencias C4: (x+3)²+(y-1)²=9 y C5: (x-4)²+(y+1)²=4 es',opts:['Exteriores','Secantes','Tangentes interiormente','Tangentes exteriormente'],ans:0},
];

(async()=>{
  let ins=0,skp=0;
  for(const ex of EXS){
    if(ex.ans<0){console.log('  Q'+ex.num+': skipped (needs graph/manual)');continue;}
    const src=A+' | ej '+ex.num;
    const exists=await p.query('SELECT id FROM exercises WHERE source=$1',[src]);
    if(exists.rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.topic,ex.q,'',JSON.stringify(ex.opts),JSON.stringify([{math:'',expl:'Respuesta: '+ex.opts[ex.ans]}]),null,ex.diff,'tec_paa',2024,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,',Skipped:',skp);
  await p.end();
})();

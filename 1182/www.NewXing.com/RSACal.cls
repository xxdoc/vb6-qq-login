VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "RSACal"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
'Download by http://www.NewXing.com
'Option Explicit

Private Const MaxLength As Long = 20000
Private Const CntSmallPrimes As Long = 300

Private Pom0(MaxLength) As Long
Private Pom1(MaxLength) As Long
Private Pom2(MaxLength) As Long
Private Pom3(MaxLength) As Long
Private Pom4(MaxLength) As Long
Private Pom5(MaxLength) As Long
Private Pom6(MaxLength) As Long
Private Pom7(MaxLength) As Long

Private LengthPom0 As Long
Private LengthPom1 As Long
Private LengthPom2 As Long
Private LengthPom3 As Long
Private LengthPom4 As Long
Private LengthPom5 As Long
Private LengthPom6 As Long
Private LengthPom7 As Long

Private K1(MaxLength) As Long
Private K10(MaxLength) As Long
Private K100(MaxLength) As Long
Private K200(MaxLength) As Long
Private K10000(MaxLength) As Long

Private AAAA(MaxLength) As Long
Private BBBB(MaxLength) As Long
Private CCCC(MaxLength) As Long
Private DDDD(MaxLength) As Long

Private LengthAAAA As Long
Private LengthBBBB As Long
Private LengthCCCC As Long
Private LengthDDDD As Long

Private SmallPrime(300) As String '301 small primes
Private Inited As Boolean

Private Function CompareB(a() As Long, LengthA As Long, B() As Long, LengthB As Long) As Long

  Dim i As Long

    Select Case LengthA - LengthB
      Case Is < 0
        CompareB = -1
      Case Is = 0
        CompareB = 0
        For i = 1 To LengthA
            Select Case a(LengthA - i + 1) - B(LengthA - i + 1)
              Case Is < 0
                CompareB = -1
                Exit For '>---> Next
              Case Is = 0
              Case Is > 0
                CompareB = 1
                Exit For '>---> Next
            End Select
        Next i
      Case Is > 0
        CompareB = 1
    End Select

End Function

Private Function BigNumberToText(C() As Long, Length As Long) As String

  Dim i As Long
  Dim Pom As String

    If C(0) = -1 Then
        Pom = "-"
      Else 'NOT C(0)...
        Pom = ""
    End If
    Pom = Pom & Format$(C(Length), "0")
    For i = Length - 1 To 1 Step -1
        Pom = Pom & Format$(C(i), "0000")
    Next i
    BigNumberToText = Pom

End Function

Private Sub TextToBigNumber(Tekst As String, a() As Long, LengthA As Long)

  Dim i As Long
  Dim Prvi As String
  Dim MaxLengthPrvi As Long
  Dim Ostatak As Long

    Prvi = Trim$(Tekst)
    If IsBigNum(Prvi) Then
        a(0) = 0
        If Left$(Prvi, 1) = "+" Then
            Prvi = Right$(Prvi, Len(Prvi) - 1)
        End If
        If Left$(Prvi, 1) = "-" Then
            Prvi = Right$(Prvi, Len(Prvi) - 1)
            a(0) = -1
        End If

        MaxLengthPrvi = Len(Prvi)
        If (MaxLengthPrvi \ 4) * 4 = MaxLengthPrvi Then
            LengthA = MaxLengthPrvi \ 4
            For i = 1 To LengthA
                a(i) = Mid$(Prvi, MaxLengthPrvi - i * 4 + 1, 4)
            Next i
          Else 'NOT (MaxLengthPRVI...
            LengthA = MaxLengthPrvi \ 4 + 1
            Ostatak = MaxLengthPrvi Mod 4
            For i = 1 To LengthA - 1
                a(i) = Mid$(Prvi, MaxLengthPrvi - i * 4 + 1, 4)
            Next i
            a(LengthA) = Mid$(Prvi, 1, Ostatak)
        End If
      Else 'IsBigNum(PRVI) = FALSE
        a(1) = 0
        LengthA = 1
    End If

End Sub

Private Sub MinusB(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

    Select Case CompareB(a, LengthA, B, LengthB)
      Case Is < 0
        Call MinusBV(B, LengthB, a, LengthA, C, LengthC)
        C(0) = -1
      Case Is = 0
        C(1) = 0
        LengthC = 1
        C(0) = 0
      Case Is > 0
        Call MinusBV(a, LengthA, B, LengthB, C, LengthC)
        C(0) = 0
    End Select

End Sub

Private Sub AddBSigned(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

    If a(0) = 0 And B(0) = 0 Then
        Call AddB(a, LengthA, B, LengthB, C, LengthC)
    End If
    If a(0) < 0 And B(0) < 0 Then
        Call AddB(a, LengthA, B, LengthB, C, LengthC)
        C(0) = -1
    End If
    If a(0) = 0 And B(0) < 0 Then
        Call MinusB(a, LengthA, B, LengthB, C, LengthC)
    End If
    If a(0) < 0 And B(0) = 0 Then
        Call MinusB(B, LengthB, a, LengthA, C, LengthC)
    End If

End Sub

Private Sub MinusBSigned(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

    If a(0) = 0 And B(0) = 0 Then
        Call MinusB(a, LengthA, B, LengthB, C, LengthC)
    End If
    If a(0) < 0 And B(0) < 0 Then
        Call MinusB(B, LengthB, a, LengthA, C, LengthC)
    End If
    If a(0) = 0 And B(0) < 0 Then
        Call AddB(a, LengthA, B, LengthB, C, LengthC)
        C(0) = 0

    End If
    If a(0) < 0 And B(0) = 0 Then
        Call AddB(B, LengthB, a, LengthA, C, LengthC)
        C(0) = -1
    End If

End Sub

Private Sub MultBSigned(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

    Call MultB(a, LengthA, B, LengthB, C, LengthC)
    If (a(0) = 0 And B(0) = 0) Or (a(0) < 0 And B(0) < 0) Then
        C(0) = 0
      Else 'NOT (A(0)...
        If LengthC = 1 And C(1) = 0 Then
            C(0) = 0
          Else 'NOT LENGTHC...
            C(0) = -1
        End If
    End If

End Sub

Private Sub CopyB(a() As Long, LengthA As Long, B() As Long, LengthB As Long)

  Dim i As Long

    LengthB = LengthA
    For i = 0 To LengthA
        B(i) = a(i)
    Next i

End Sub

Private Sub DivBSigned(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long, D() As Long, LengthD As Long)

    Call DivB(a, LengthA, B, LengthB, C, LengthC, D, LengthD)
    If (a(0) = 0 And B(0) = 0) Or (a(0) < 0 And B(0) < 0) Then
        C(0) = 0
      Else 'NOT (A(0)...
        If LengthC = 1 And C(1) = 0 Then
            C(0) = 0
          Else 'NOT LENGTHC...
            C(0) = -1
        End If
    End If

End Sub

Private Sub DivB(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long, D() As Long, LengthD As Long)

    If LengthB = 1 And B(1) = 0 Then
        C(1) = 0
        LengthC = 1
        C(0) = 0
        Exit Sub '>---> Bottom
    End If
    If LengthB = 1 And B(1) = 1 Then
        Call CopyB(a, LengthA, C, LengthC)
        Exit Sub '>---> Bottom
    End If
    If LengthA = 1 And a(1) = 0 Then
        C(1) = 0
        LengthC = 1
        C(0) = 0
        Exit Sub '>---> Bottom
    End If
    Select Case CompareB(a, LengthA, B, LengthB)
      Case Is < 0
        C(1) = 0
        LengthC = 1
        C(0) = 0
        Call CopyB(a, LengthA, D, LengthD)
      Case Is = 0
        C(1) = 1
        LengthC = 1
        C(0) = 0
        D(1) = 0
        LengthD = 1
        D(0) = 0
      Case Is > 0
        Call DivBInt(a, LengthA, B, LengthB, C, LengthC, D, LengthD)
    End Select

End Sub

Private Sub DivBInt(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long, D() As Long, LengthD As Long)

  Dim i As Long
  Dim j As Long
  Dim StrA As String
  Dim StrB As String
  Dim StrC As String
  Dim MaxLengthStrA As Long
  Dim MaxLengthStrB As Long
  Dim TR As String

    K10(1) = 10
    StrA = BigNumberToText(a, LengthA)
    If Left$(StrA, 1) = "-" Then
        StrA = Right$(StrA, Len(StrA) - 1)
    End If
    StrB = BigNumberToText(B, LengthB)
    If Left$(StrA, 1) = "-" Then
        StrA = Right$(StrA, Len(StrA) - 1)
    End If
    MaxLengthStrA = Len(StrA)
    MaxLengthStrB = Len(StrB)
    j = 0
    Call TextToBigNumber(Left$(StrA, MaxLengthStrB), Pom2, LengthPom2)
    Do While CompareB(Pom2, LengthPom2, B, LengthB) >= 0
        j = j + 1
        Call MinusBV(Pom2, LengthPom2, B, LengthB, Pom3, LengthPom3)
        Call CopyB(Pom3, LengthPom3, Pom2, LengthPom2)
    Loop
    StrC = Format$(j, "0")

    For i = 1 To MaxLengthStrA - MaxLengthStrB
        j = 0
        Call MultB(Pom2, LengthPom2, K10, 1, Pom1, LengthPom1)
        Call TextToBigNumber(Mid$(StrA, MaxLengthStrB + i, 1), Pom2, LengthPom2)
        TR = BigNumberToText(Pom1, LengthPom1)
        TR = BigNumberToText(Pom2, LengthPom2)

        Call AddB(Pom1, LengthPom1, Pom2, LengthPom2, Pom3, LengthPom3)
        Call CopyB(Pom3, LengthPom3, Pom2, LengthPom2)
        Do While CompareB(Pom2, LengthPom2, B, LengthB) >= 0
            j = j + 1
            Call MinusBV(Pom2, LengthPom2, B, LengthB, Pom3, LengthPom3)
            Call CopyB(Pom3, LengthPom3, Pom2, LengthPom2)
        Loop
        StrC = StrC & Format$(j, "0")
    Next i
    Call CopyB(Pom2, LengthPom2, D, LengthD)
    Call TextToBigNumber(StrC, C, LengthC)

End Sub

Private Sub AddB(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

  Dim Prenos As Long
  Dim i As Long
  Dim j As Long

    Prenos = 0
    If LengthA > LengthB Then
        LengthC = LengthA + 1
        For i = 1 To LengthB
            C(i) = a(i) + B(i) + Prenos
            Prenos = C(i) \ 10000
            C(i) = C(i) Mod 10000
        Next i
        i = LengthB + 1
        Do While Prenos > 0 And i <= LengthA
            C(i) = a(i) + Prenos
            Prenos = C(i) \ 10000
            C(i) = C(i) Mod 10000
            i = i + 1
        Loop
        If i > LengthA Then
            C(i) = Prenos
          Else 'NOT I...
            For j = i To LengthA
                C(j) = a(j)
            Next j
            C(LengthA + 1) = 0
        End If
      Else 'NOT LENGTHA...
        LengthC = LengthB + 1
        For i = 1 To LengthA
            C(i) = a(i) + B(i) + Prenos
            Prenos = C(i) \ 10000
            C(i) = C(i) Mod 10000
        Next i
        i = LengthA + 1
        Do While Prenos > 0 And i <= LengthB
            C(i) = B(i) + Prenos
            Prenos = C(i) \ 10000
            C(i) = C(i) Mod 10000
            i = i + 1
        Loop
        If i > LengthB Then
            C(i) = Prenos
          Else 'NOT I...
            For j = i To LengthB
                C(j) = B(j)
            Next j
            C(LengthB + 1) = 0
        End If
    End If
    If C(LengthC) = 0 Then
        LengthC = LengthC - 1
    End If

End Sub

Private Sub MinusBV(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

  Dim Prenos As Long
  Dim i As Long
  Dim j As Long

    Prenos = 0
    LengthC = LengthA
    For i = 1 To LengthB
        C(i) = a(i) - B(i) - Prenos
        If C(i) < 0 Then
            C(i) = C(i) + 10000
            Prenos = 1
          Else 'NOT C(I)...
            Prenos = 0
        End If
    Next i
    i = LengthB + 1
    Do While Prenos > 0 And i <= LengthA
        C(i) = a(i) - Prenos
        If C(i) < 0 Then
            C(i) = C(i) + 10000
            Prenos = 1
          Else 'NOT C(I)...
            Prenos = 0
        End If
        i = i + 1
    Loop
    If i > LengthA Then
        C(i) = Prenos
      Else 'NOT I...
        For j = i To LengthA
            C(j) = a(j)
        Next j
    End If
    Do Until C(LengthC) <> 0 Or LengthC = 1
        LengthC = LengthC - 1
    Loop

End Sub

Private Sub PowerB(a() As Long, LengthA As Long, PowerB As Long, C() As Long, LengthC As Long)

  Dim i As Long

    C(1) = 1
    LengthC = 1
    i = 1
    Do While (i <= PowerB)
        i = i * 2
    Loop
    Do
        i = i \ 2
        Call MultBSigned(C, LengthC, C, LengthC, C, LengthC)
        If (i And PowerB) Then
            Call MultBSigned(a, LengthA, C, LengthC, C, LengthC)
        End If
    Loop While (i > 1)

End Sub

Private Sub MultB(a() As Long, LengthA As Long, B() As Long, LengthB As Long, C() As Long, LengthC As Long)

  Dim Prenos As Long
  Dim i As Long
  Dim j As Long

    If (LengthB = 1 And B(1) = 0) Or (LengthA = 1 And a(1) = 0) Then
        C(1) = 0
        LengthC = 1
        C(0) = 0
        Exit Sub '>---> Bottom
    End If
    If LengthB = 1 And B(1) = 1 Then
        Call CopyB(a, LengthA, C, LengthC)
        Exit Sub '>---> Bottom
    End If
    If LengthA = 1 And a(1) = 1 Then
        Call CopyB(B, LengthB, C, LengthC)
        Exit Sub '>---> Bottom
    End If
    Prenos = 0
    For i = 1 To LengthA + LengthB
        Pom0(i) = 0
    Next i
    For i = 1 To LengthB
        For j = 1 To LengthA
            Pom0(i + j - 1) = Pom0(i + j - 1) + a(j) * B(i)
            Prenos = Pom0(i + j - 1) \ 10000
            Pom0(i + j - 1) = Pom0(i + j - 1) Mod 10000
            Pom0(i + j) = Pom0(i + j) + Prenos
        Next j
    Next i

    LengthPom0 = LengthA + LengthB
    Do Until Pom0(LengthPom0) <> 0 Or LengthPom0 = 1
        LengthPom0 = LengthPom0 - 1
    Loop
    Call CopyB(Pom0, LengthPom0, C, LengthC)

End Sub

Private Sub SqrtB(a() As Long, LengthA As Long, C() As Long, LengthC As Long, D() As Long, LengthD As Long)

  Dim Prvi As Long
  Dim i As Long
  Dim j As Long
  Dim TR As String

    For i = 0 To MaxLength
        Pom4(i) = 0
        Pom5(i) = 0
        Pom6(i) = 0
        Pom7(i) = 0
        D(i) = 0
    Next i
    LengthPom4 = 1
    LengthPom5 = 1
    LengthPom6 = 1
    LengthPom7 = 1
    LengthD = 1
    K100(1) = 100
    K200(1) = 200
    K10000(2) = 1
    K1(1) = 1
    If a(0) = 0 Then
        Prvi = Int(Sqr(a(LengthA)))
        C(1) = Prvi
        C(0) = 0
        LengthC = 1
        D(1) = a(LengthA) - Prvi * Prvi
        LengthD = 1
        For i = LengthA - 1 To 1 Step -1
            Call MultB(D, LengthD, K10000, 2, D, LengthD)
            D(1) = a(i)
            TR = BigNumberToText(D, LengthD)
            Call MultB(C, LengthC, K200, 1, Pom4, LengthPom4)
            TR = BigNumberToText(Pom4, LengthPom4)
            Call DivB(D, LengthD, Pom4, LengthPom4, Pom5, LengthPom5, Pom7, LengthPom7)
            TR = BigNumberToText(Pom5, LengthPom5)
            Call AddB(Pom5, LengthPom5, Pom4, LengthPom4, Pom4, LengthPom4)
            TR = BigNumberToText(Pom4, LengthPom4)
            Call MultB(Pom5, LengthPom5, Pom4, LengthPom4, Pom6, LengthPom6)
            TR = BigNumberToText(Pom6, LengthPom6)
            Do While CompareB(D, LengthD, Pom6, LengthPom6) < 0 And Pom5(1) > 0
                Call MinusB(Pom4, LengthPom4, K1, 1, Pom4, LengthPom4)
                TR = BigNumberToText(Pom4, LengthPom4)
                Call MinusB(Pom5, LengthPom5, K1, 1, Pom5, LengthPom5)
                TR = BigNumberToText(Pom5, LengthPom5)
                Call MultB(Pom5, LengthPom5, Pom4, LengthPom4, Pom6, LengthPom6)
                TR = BigNumberToText(Pom6, LengthPom6)
            Loop
            Call MinusB(D, LengthD, Pom6, LengthPom6, D, LengthD)
            TR = BigNumberToText(D, LengthD)
            Call MultB(C, LengthC, K100, 1, C, LengthC)
            TR = BigNumberToText(C, LengthC)
            Call AddB(C, LengthC, Pom5, LengthPom5, C, LengthC)
            TR = BigNumberToText(C, LengthC)
        Next i
      Else 'NOT A(0)...
        C(1) = 0
        C(0) = 0
        LengthC = 1
    End If

End Sub

'Rabin-Miller素性检测核心程序
Private Function RabinMillerKnl(ByVal aString As String) As Boolean

  Dim bb As Long, jj As Long, ii As Long, mr As Long
  Dim mm As String, vv As String, n1 As String

    mm = BigSub(aString, "1")
    n1 = BigSub(aString, "1")
    jj = 0
    '0、先计算出m、j，使得n-1=m*2^j，其中m是正奇数，j是非负整数
    mr = Val(Right$(mm, 1))
    Do While (mr Mod 2 = 0)
        jj = jj + 1
        mm = BigDivMod(mm, "2", False)
        mr = Val(Right$(mm, 1))
    Loop
    '1、随机取一个b，2<=b<n-1
    bb = 2 + Rnd(1) * 65536
    '2、计算v=b^m mod n
    vv = BigPowMod(Str$(bb), mm, aString)
    '3、如果v==1，通过测试
    If (vv = "1") Then
        RabinMillerKnl = True
        Exit Function '>---> Bottom
    End If
    '4、令i=1
    ii = 1
    '5、如果v=n-1，通过测试
    Do While (vv <> n1)
        '6、如果i==l，非素数，结束
        If (ii = jj) Then
            RabinMillerKnl = False
            Exit Function '>---> Bottom
        End If
        '7、v=v^2 mod n，i=i+1
        vv = BigDivMod(BigMul(vv, vv), aString, True)
        ii = ii + 1
        '8、循环到5
    Loop
    RabinMillerKnl = True

End Function

'Rabin-Miller素性检测
Private Function RabinMiller(ByVal aString As String, Loops As Long) As Boolean

  Dim i As Long

    For i = 0 To CntSmallPrimes Step 1
        If BigDivMod(aString, SmallPrime(i), True) = 0 Then
            RabinMiller = False
            Exit Function '>---> Bottom
        End If
    Next i

    For i = 1 To Loops Step 1
        If Not RabinMillerKnl(aString) Then
            RabinMiller = False
            Exit Function '>---> Bottom
        End If
    Next i
    RabinMiller = True

End Function

'初始化小素数数组
Private Sub InitSmallPrimes()

  Dim i As Long, j As Long, k As Long
  Dim prime As Boolean

    SmallPrime(0) = "3"
    For i = 1 To CntSmallPrimes Step 1
        j = SmallPrime(i - 1)
        Do
            j = j + 2
            prime = True
            For k = 0 To i - 1 Step 1
                If j Mod SmallPrime(k) = 0 Then
                    prime = False
                    Exit For '>---> Next
                End If
            Next k
        Loop While prime = False
        SmallPrime(i) = j
    Next i
    Inited = True

End Sub

'大数相加，返回值=A+B
Public Function BigAdd(ByVal aString As String, ByVal bString As String) As String

    Call TextToBigNumber(aString, AAAA, LengthAAAA)
    Call TextToBigNumber(bString, BBBB, LengthBBBB)
    Call AddBSigned(AAAA, LengthAAAA, BBBB, LengthBBBB, CCCC, LengthCCCC)
    BigAdd = BigNumberToText(CCCC, LengthCCCC)

End Function

'大数相减，返回值=A-B
Function BigSub(ByVal aString As String, ByVal bString As String) As String

    Call TextToBigNumber(aString, AAAA, LengthAAAA)
    Call TextToBigNumber(bString, BBBB, LengthBBBB)

    Call MinusBSigned(AAAA, LengthAAAA, BBBB, LengthBBBB, CCCC, LengthCCCC)
    BigSub = BigNumberToText(CCCC, LengthCCCC)

End Function

'大数相乘，返回值=A*B
Function BigMul(ByVal aString As String, ByVal bString As String) As String

    Call TextToBigNumber(aString, AAAA, LengthAAAA)
    Call TextToBigNumber(bString, BBBB, LengthBBBB)
    Call MultBSigned(AAAA, LengthAAAA, BBBB, LengthBBBB, CCCC, LengthCCCC)
    BigMul = BigNumberToText(CCCC, LengthCCCC)

End Function

'大数乘方，返回值=A^B
Function BigPow(ByVal aString As String, ByVal bString As String) As String

    Call TextToBigNumber(aString, AAAA, LengthAAAA)
    If IsBigNum(bString) Then
        If Abs(Val(bString)) <= 32767 Then
            Call PowerB(AAAA, LengthAAAA, Val(bString), CCCC, LengthCCCC)
            BigPow = BigNumberToText(CCCC, LengthCCCC)
        End If
      Else 'IsBigNum(BSTRING) = FALSE
        BigPow = "0"
    End If

End Function

'大数相除或求余，aMod=True时，返回值=A%B，否则返回值=A/B
Function BigDivMod(ByVal aString As String, ByVal bString As String, aMod As Boolean) As String

    Call TextToBigNumber(aString, AAAA, LengthAAAA)
    Call TextToBigNumber(bString, BBBB, LengthBBBB)
    Call DivBSigned(AAAA, LengthAAAA, BBBB, LengthBBBB, CCCC, LengthCCCC, DDDD, LengthDDDD)
    If aMod Then
        BigDivMod = BigNumberToText(DDDD, LengthDDDD)
      Else 'AMOD = FALSE
        BigDivMod = BigNumberToText(CCCC, LengthCCCC)
    End If

End Function

'阶乘，返回值=Ulaz!
Function BigFac(Ulaz As Long) As String

  Dim i As Long
  Dim Crt(MaxLength) As Long
  Dim LengthCrt As Long

    Crt(1) = 1
    LengthCrt = 1
    For i = 2 To Ulaz
        Pom4(1) = i
        LengthPom4 = 1
        Call MultB(Crt, LengthCrt, Pom4, LengthPom4, Crt, LengthCrt)
    Next i
    BigFac = BigNumberToText(Crt, LengthCrt)

End Function

'随机生成素数，nBits是二进制长度
Function BigPrime(nBits As Long) As String

  Dim DecLen As Long, i As Long
  Dim BigX As String

    If Not Inited Then
        Call InitSmallPrimes
    End If
    '根据二进制长度求出十进制长度,0.30103=Log10(2)，但最高位数字不好确定，在这里定为1
    '但这样得出的素数二进制位数可能和预期的有些差别，没办法了，将就用吧。
    DecLen = nBits * 0.30103
    BigX = "1"
    For i = 1 To DecLen - 2 Step 1
        BigX = BigX & Int(Rnd(1) * 10) '随机填充数字
    Next i
    BigX = BigX & "1" '同时素数必为奇数，所以初始时暂时设置为最后一位为1，然后每次加2，做素性判断。
    Do While (RabinMiller(BigX, 5) = False)
        BigX = BigAdd(BigX, "2")
        Debug.Print BigX & vbCrLf
    Loop
    BigPrime = BigX

End Function

'大数模幂，返回值=a^b % n
Function BigPowMod(ByVal aString As String, ByVal bString As String, ByVal nString As String) As String

  Dim aa As String, bb As String, cc As String, bn As Long

    aa = aString
    bb = bString
    cc = "1"
    Do While (bb > "0")
        bn = Val(Right$(bb, 1))
        If (bn Mod 2 = 0) Then
            bb = BigDivMod(bb, "2", False) 'bb=bb/2
            aa = BigDivMod(BigMul(aa, aa), nString, True) 'aa=aa*aa % n
        End If
        bb = BigSub(bb, "1")
        cc = BigDivMod(BigMul(aa, cc), nString, True)
    Loop
    BigPowMod = cc

End Function

'已知a、b，求x，满足a*x =1 (mod b)，相当于求解a*x-b*y=1的最小整数解（此函数有问题）
Function BigEuclid(ByVal aString As String, ByVal bString As String) As String

  Dim m As String, e As String, si As String, sj As String, x As String, y As String
  Dim xx As Long, yy As Long

    m = bString
    e = aString
    x = "0"
    y = "1"
    xx = 1
    yy = 1
    Do While (e > "0")
        Call TextToBigNumber(m, AAAA, LengthAAAA)
        Call TextToBigNumber(e, BBBB, LengthBBBB)
        Call DivBInt(AAAA, LengthAAAA, BBBB, LengthBBBB, CCCC, LengthCCCC, DDDD, LengthDDDD) '这里有问题，很奇怪
        si = BigNumberToText(CCCC, LengthCCCC)
        sj = BigNumberToText(DDDD, LengthDDDD)
        m = e
        e = sj
        sj = y
        y = BigMul(y, si)
        If (xx = yy) Then
            If ((x > y) And (Len(x) = Len(y)) Or (Len(x) > Len(y))) Then
                y = BigSub(x, y)
              Else 'NOT (X...'NOT ((X...
                y = BigSub(y, x)
                yy = 0
            End If
          Else 'NOT (XX...
            y = BigAdd(y, x)
            xx = 1 - xx
            yy = 1 - yy
        End If
        x = sj
    Loop
    If (xx = 0) Then
        x = BigSub(bString, x)
    End If
    BigEuclid = x

End Function

Public Function IsBigNum(Ulaz As String) As Boolean

  Dim Pom As String
  Dim Pom10 As String
  Dim i As Long
  Dim IsBigNum1 As Boolean

    Pom10 = Ulaz
    Pom = Left$(Pom10, 300)
    If IsNumeric(Pom) Then
        If InStr(1, Pom, "e", 1) > 0 Then
            IsBigNum1 = False
          Else 'NOT INSTR(1,...
            If InStr(1, Pom, ".", 1) > 0 Then
                IsBigNum1 = False
              Else 'NOT INSTR(1,...
                If InStr(1, Pom, ",", 1) > 0 Then
                    IsBigNum1 = False
                  Else 'NOT INSTR(1,...
                    IsBigNum1 = True
                End If
            End If
        End If
      Else 'ISNUMERIC(POM) = FALSE
        IsBigNum1 = False
    End If

    If IsBigNum1 Then
        For i = 1 To Len(Pom10) \ 300
            Pom = Mid$(Pom10, 300 * i, 300)
            If IsNumeric(Pom) Then
                If InStr(1, Pom, "e", 1) > 0 Then
                    IsBigNum1 = False
                  Else 'NOT INSTR(1,...
                    If InStr(1, Pom, ".", 1) > 0 Then
                        IsBigNum1 = False
                      Else 'NOT INSTR(1,...
                        If InStr(1, Pom, ",", 1) > 0 Then
                            IsBigNum1 = False
                          Else 'NOT INSTR(1,...
                            If InStr(1, Pom, "-", 1) > 0 Then
                                IsBigNum1 = False
                              Else 'NOT INSTR(1,...
                                If InStr(1, Pom, "+", 1) > 0 Then
                                    IsBigNum1 = False
                                  Else 'NOT INSTR(1,...
                                    IsBigNum1 = True
                                End If
                            End If
                        End If
                    End If
                End If
              Else 'ISNUMERIC(POM) = FALSE
                IsBigNum1 = False
            End If

        Next i
    End If
    IsBigNum = IsBigNum1

End Function


'另外一些大数有关的代码
'@#预备函数
Function sums(ByVal x As String, ByVal y As String) As String '@# sum of two hugehexnum（两个大数之和）
Dim max As Long, temp As Long, i As Long, result As Variant
max = IIf(Len(x) >= Len(y), Len(x), Len(y))
x = Right(String(max, "0") & x, max)
y = Right(String(max, "0") & y, max)
ReDim result(0 To max)
For i = max To 1 Step -1
result(i) = Val(Mid(x, i, 1)) + Val(Mid(y, i, 1))
Next
For i = max To 1 Step -1
temp = result(i) \ 10
result(i) = result(i) Mod 10
result(i - 1) = result(i - 1) + temp
Next
If result(0) = 0 Then result(0) = ""
sums = Join(result, "")
Erase result

End Function

Function multi(ByVal x As String, ByVal y As String) As String '@#multi of two huge hexnum（两个大数之积）
Dim result As Variant
Dim xl As Long, yl As Long, temp As Long, i As Long
xl = Len(Trim(x))
yl = Len(Trim(y))

ReDim result(1 To xl + yl)
For i = 1 To xl
For temp = 1 To yl
result(i + temp) = result(i + temp) + Val(Mid(x, i, 1)) * Val(Mid(y, temp, 1))
Next
Next

For i = xl + yl To 2 Step -1
temp = result(i) \ 10
result(i) = result(i) Mod 10
result(i - 1) = result(i - 1) + temp
Next

If result(1) = "0" Then result(1) = ""
multi = Join(result, "")
Erase result

End Function

Function powers(ByVal x As Integer) As String '@# get 16777216^x,ie 16^(6*x)（16777216的x 次方）
powers = 1
Dim i As Integer
For i = 1 To x
powers = multi(powers, CLng(&H1000000))
Next
End Function

Function half(ByVal x As String) As String '@#get half of x（取半）
x = 0 & x
Dim i As Long
ReDim result(2 To Len(x)) As String
For i = 2 To Len(x)
result(i) = CStr(Val(Mid(x, i, 1)) \ 2 + IIf(Val(Mid(x, i - 1, 1)) Mod 2 = 1, 5, 0))
Next
half = Join(result, "")
If Left(half, 1) = "0" Then half = Right(half, Len(half) - 1) '@# no zero ahead
End Function


'@#另一个有用的函数：
Function powerxy(ByVal x As Integer, ByVal y As Integer) As String '@#get x^y（x 的 y 次方）
Dim i As Integer
powerxy = x
For i = 2 To y
powerxy = multi(powerxy, x)
Next
End Function

'@#进制转换函数：

'@#16 to 10
Function hextodec(ByVal x As String) As String
Dim a() As String, i As Long, unit As Integer
For i = 1 To Len(x)
If Not IsNumeric("&h" & Mid(x, i, 1)) Then MsgBox "not a hex format!", 64, "info": Exit Function
Next
x = String((6 - Len(x) Mod 6) Mod 6, "0") & x

unit = Len(x) \ 6 - 1
ReDim a(unit)
For i = 0 To unit
a(i) = CLng("&h" & Mid(x, i * 6 + 1, 6))
Next
For i = 0 To unit
a(i) = multi(a(i), powers(unit - i))
hextodec = sums(hextodec, a(i))
Next
End Function


'@# 10 to 16
Function dectohex(ByVal hugenum As String) As String '@# trans hugenum to hex
Do While Len(hugenum) > 2
dectohex = Hex(Val(Right(hugenum, 4)) Mod 16) & dectohex
For i = 1 To 4 '@#devide hugenum by 16
hugenum = half(hugenum)
Next
Loop
dectohex = Hex(Val(hugenum)) & dectohex
End Function

'@# 字符串 to hex
Function StrToHex(ByVal S As String) As String
          On Error Resume Next
          Dim ByteArr()     As Byte
          ByteArr = StrConv(S, vbFromUnicode)
          Dim Temps     As String
          Dim temp     As Byte
          Dim i     As Long
          Dim outs     As String
          For i = 0 To UBound(ByteArr)
                  temp = ByteArr(i)
                  Temps = Hex(temp)
                  Temps = Right("00" & Temps, 2)
                  outs = outs & Temps
          Next
          StrToHex = outs
End Function

'@# hex to 字符串
Function HexToStr(ByVal S As String) As String
          On Error Resume Next
          Dim ByteArr()     As Byte
          Dim Temps     As String
          Dim temp     As Byte
          Dim i     As Long
          Dim j     As Long
          j = 0
          Dim outs     As String
          For i = 1 To Len(S) Step 2
                  Temps = Mid(S, i, 2)
                  temp = Val("&H" & Temps)
                  ReDim Preserve ByteArr(j)
                  ByteArr(j) = temp
                  j = j + 1
          Next
          outs = StrConv(ByteArr, vbUnicode)
          HexToStr = outs
End Function


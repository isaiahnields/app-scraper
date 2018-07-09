import matplotlib as mpl
mpl.use('TkAgg')
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import sqlite3

def draw_boxplot():

    conn = sqlite3.connect('reviews.db')

    df = pd.read_sql_query("SELECT * FROM SquarePOS", conn)

    # Draw a nested boxplot to show bills by day and sex
    sns.boxplot(x=df["Score"])
    plt.show()
    conn.exit()



draw_boxplot()

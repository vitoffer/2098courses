"""add name field to courses table

Revision ID: 27f227c0f6f5
Revises:
Create Date: 2024-09-11 18:15:39.064955

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '27f227c0f6f5'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('course', sa.Column('name', sa.String))


def downgrade() -> None:
    op.drop_column('course', 'name')
